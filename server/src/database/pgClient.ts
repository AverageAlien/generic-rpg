import { Connection, ConnectionConfiguration } from 'postgresql-client';
import { from, Observable } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';

interface QueryParameter {
  value: any;
  /**
   * Retrieve from `postgres.DataTypeOIDs`
   */
  type: number;
}

export class PgClient {
  public query<T>(command: string, params: QueryParameter[] = []): Observable<T[]> {

    const connection = new Connection(!!process.env.DATABASE_URL
      ? this.makeProdConnectionConfig(process.env.DATABASE_URL)
      : this.makeLocalConnectionConfig());

    const observable = from(connection.connect())
      .pipe(
        mergeMap(() => connection.prepare(command, { paramTypes: params.map(p => p.type) })),
        mergeMap(statement => statement.execute({
          objectRows: true,
          params: params.map(p => p.value)
        })),
        map(r => r.rows as unknown[] as T[]),
        finalize(() => connection.close()));

    return observable;
  }

  private makeLocalConnectionConfig() {
    return {
      host: 'localhost',
      port: 5432,
      user: 'my_user',
      password: '12345',
      database: 'genericRpg',
      timezone: 'Europe/Amsterdam'
    } as ConnectionConfiguration;
  }

  private makeProdConnectionConfig(databaseUrl: string) {
    const connectionRegex = /postgres:\/\/([a-z]+):([\w]+)@(.+):([\d]+)\/([\w]+)/g;
    const matches = connectionRegex.exec(databaseUrl);

    return {
      host: matches[3],
      port: Number.parseInt(matches[4], 10),
      user: matches[1],
      password: matches[2],
      database: matches[5],
      ssl: {
        rejectUnauthorized: false
      }
    } as ConnectionConfiguration;
  }
}
