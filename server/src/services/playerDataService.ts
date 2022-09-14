import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PgClient } from '../database/pgClient';
import { UserDataDTO } from '../database/models/userDataDTO';
import { HumanoidEntity } from '../gameData/gameplay/entities/humanoidEntity';
import { GameClient } from '../models/gameClient';
import { MakeUserDataSnapshot, PlayerDataSnapshot } from '../models/userDataSnapshot';
import { DataTypeOIDs } from 'postgresql-client';
import { WeaponPresets } from '../gameData/itemPresets/weaponPresets';

export class PlayerDataService {
  constructor() {}

  loadPlayerData(username: string): Observable<UserDataDTO> {
    const client = new PgClient();

    const query = `
      SELECT ud.* FROM public.userdata ud JOIN public.users u ON ud.userid = u.id WHERE u.username = $1`;

    return client.query<UserDataDTO>(query, [{value: username, type: DataTypeOIDs.varchar}]).pipe(
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
        $1 as location,
        $2 as playerdata
      FROM public.users WHERE username = $3
      RETURNING *`;

    return client.query<UserDataDTO>(query, [
      {value: startLocation, type: DataTypeOIDs.varchar},
      {value: JSON.stringify(playerData), type: DataTypeOIDs.text},
      {value: username, type: DataTypeOIDs.varchar}
    ]).pipe(
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
        playerdata = $1,
        location = $2
      FROM public.users u
      WHERE u.username = $3 AND userdata.userid = u.id
      RETURNING userdata.*`;

    client.query<UserDataDTO>(query, [
      {value: JSON.stringify(snapshot), type: DataTypeOIDs.text},
      {value: roomName, type: DataTypeOIDs.varchar},
      {value: username, type: DataTypeOIDs.varchar}
    ]).subscribe(r => {
      console.log(`Saved player data for ${username}`);
    });
  }

  private get makeDefaultPlayerData(): PlayerDataSnapshot {
    return {
      level: 1,
      speed: 25,
      maxHealth: 50,
      inventory: [ WeaponPresets.woodenStick() ],
      equipment: {
        weapon: WeaponPresets.woodenStick()
      }
    };
  }
}