import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PgClient } from '../database/databaseClient';
import { UserDataDTO } from '../database/models/userDataDTO';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { DamageType } from '../gameData/gameplay/items/itemEnums';
import { Weapon } from '../gameData/gameplay/items/weapon';
import { GameClient } from '../models/gameClient';
import { MakeUserDataSnapshot, PlayerDataSnapshot } from '../models/userDataSnapshot';

export class PlayerDataService {
  constructor() {}

  loadPlayerData(username: string): Observable<UserDataDTO> {
    const client = new PgClient();

    const query = `
      SELECT ud.* FROM public.userdata ud JOIN public.users u ON ud.userid = u.id WHERE u.username = '${username}'`;

    return client.query<UserDataDTO>(query).pipe(
      map(r => {
        if (r.length === 0) {
          return null;
        }

        return r[0];
      })
    );
  }

  createPlayerData(username: string): Observable<UserDataDTO> {
    const client = new PgClient();
    const playerData = this.makeDefaultPlayerData;
    const startLocation = 'test_01';

    const query = `
      INSERT INTO public.userdata (userid, location, playerdata)
      SELECT
        id as userid,
        '${startLocation}' as location,
        '${JSON.stringify(playerData)}' as playerdata
      FROM public.users WHERE username = '${username}'
      RETURNING *`;

    return client.query<UserDataDTO>(query).pipe(
      map(r => {
        if (r.length === 0) {
          return null;
        }

        return r[0];
      })
    );
  }

  savePlayerData(username: string, roomName: string, gameClient: GameClient) {
    if (gameClient.controlledEntity == null) {
      return null;
    }

    const client = new PgClient();

    const snapshot = MakeUserDataSnapshot(gameClient as GameClient & {controlledEntity: HumanoidEntity});

    const query = `
      UPDATE userdata SET
        playerdata = '${JSON.stringify(snapshot)}',
        location = '${roomName}'
      FROM public.users u
      WHERE u.username = '${username}' AND userdata.userid = u.id
      RETURNING userdata.*`;

    client.query<UserDataDTO>(query).subscribe(r => {
      console.log(`Saved player data for ${username}`);
    });
  }

  private get makeDefaultPlayerData(): PlayerDataSnapshot {
    return {
      level: 1,
      speed: 25,
      maxHealth: 50,
      inventory: [
        new Weapon({
          name: 'Wooden stick',
          description: 'An old wooden stick to hit people with',
          texture: 'wooden_stick',
          damage: [
            {
              value: 5,
              type: DamageType.Blunt
            }
          ],
          level: 1,
          mass: 5,
          price: 5,
          reach: 64,
          refire: 250,
          swing: 120
        })
      ],
      equipment: {
        weapon: new Weapon({
          name: 'Wooden stick',
          description: 'An old wooden stick to hit people with',
          texture: 'wooden_stick',
          damage: [
            {
              value: 5,
              type: DamageType.Blunt
            }
          ],
          level: 1,
          mass: 5,
          price: 5,
          reach: 64,
          refire: 250,
          swing: 120
        })
      }
    };
  }
}