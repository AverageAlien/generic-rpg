import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PgClient } from '../database/databaseClient';
import { UserDTO } from '../database/models/userDTO';
import { AuthResult } from '../models/authResult.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
const md5 = require('md5');

export class AuthenticationService {
  constructor() {}

  login(model: LoginModel): Observable<AuthResult> {
    const client = new PgClient();

    const passwordHash = md5(model.password) as string;

    const query = `SELECT * FROM public.Users WHERE username = \'${model.username}\' AND password = \'${passwordHash}\'`;

    console.log(query)
    const result = client.query<UserDTO>(query);

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

    const findUser = `SELECT * FROM public.Users WHERE username = \'${model.username}\'`;
    const addUser = `
      INSERT INTO public.Users (username, password, isadmin, isbanned, email)
      VALUES (\'${model.username}\', \'${passwordHash}\', false, false, \'${model.email}\')
      RETURNING *`;

    return client.query<UserDTO>(findUser).pipe(
      mergeMap(r => {
        if (r.length > 0) {
          return of({
            username: null,
            error: 'Username already taken'
          } as AuthResult);
        }

        return client.query<UserDTO>(addUser).pipe(
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
          })
        );
      })
    );
  }
}
