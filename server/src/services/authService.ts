import { Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import jwt from 'jsonwebtoken';

import { PgClient } from '../database/pgClient';
import { UserDTO } from '../database/models/userDTO';
import { AuthResult } from '../models/authResult.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { PlayerDataService } from './playerDataService';
import { AuthToken } from '../models/authToken.model';
import md5 from 'md5';
import { GLOBAL_AUTH_COOKIENAME, GLOBAL_AUTH_SECRET } from '..';
import { Response } from 'express';
import { DataTypeOIDs } from 'postgresql-client';

export class AuthenticationService {
  constructor(private playerDataService: PlayerDataService) {}

  static makeToken(authResult: AuthResult) {
    return jwt.sign({
      username: authResult.username
    } as AuthToken,
    GLOBAL_AUTH_SECRET,
    {
      expiresIn: '7d'
    })
  }

  /**
   * @returns Token payload or `null` if token invalid
   */
  static getTokenPayload(token: string): AuthToken {
    try {
      const payload = jwt.verify(token, GLOBAL_AUTH_SECRET);

      return payload as AuthToken;
    } catch (err) {
      console.log(`Token error: ${err}`);

      return null;
    }
  }

  static attachAuthCookie(res: Response<any>, token: string) {
    res.cookie(GLOBAL_AUTH_COOKIENAME, token,
    {
      signed: false,
      secure: true,
      sameSite: 'none'
    });
  }

  login(model: LoginModel): Observable<AuthResult> {
    const client = new PgClient();

    const passwordHash = md5(model.password) as string;

    const query = 'SELECT * FROM public.Users WHERE username = $1 AND password = $2';

    const result = client.query<UserDTO>(query, [
      { value: model.username, type: DataTypeOIDs.varchar },
      { value: passwordHash, type: DataTypeOIDs.varchar }
    ]);

    return result.pipe(
      map(r => {
        if (r.length === 0) {
          return {
            username: null,
            error: 'Invalid username or password'
          } as AuthResult;
        }

        return {
          username: r[0].username,
          error: null
        } as AuthResult;
      })
    );
  }

  register(model: RegisterModel): Observable<AuthResult> {
    const client = new PgClient();

    const passwordHash = md5(model.password) as string;

    const findUser = 'SELECT * FROM public.Users WHERE username = $1';
    const addUser = `
      INSERT INTO public.Users (username, password, isadmin, isbanned, email)
      VALUES ($1, $2, false, false, $3)
      RETURNING *`;

    return client.query<UserDTO>(findUser, [{value: model.username, type: DataTypeOIDs.varchar}]).pipe(
      mergeMap(r => {
        if (r.length > 0) {
          return of({
            username: null,
            error: 'Username already taken'
          } as AuthResult);
        }

        return client.query<UserDTO>(addUser, [
          {value: model.username, type: DataTypeOIDs.varchar},
          {value: passwordHash, type: DataTypeOIDs.varchar},
          {value: model.email, type: DataTypeOIDs.varchar}
        ]).pipe(
          map(add => {
            if (add.length === 0) {
              return {
                username: null,
                error: 'A server error occured'
              } as AuthResult;
            }

            return {
              username: add[0].username,
              error: null
            } as AuthResult;
          }),
          tap(add => {
            if (!!add.username && add.error == null) {
              this.playerDataService.createPlayerData(add.username).subscribe(playerData => {
                console.log(`Created playerData for ${add.username}`);
              });
            }
          })
        );
      })
    );
  }
}
