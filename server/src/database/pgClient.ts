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
    console.log(command);
    console.log(params);

    const connection = new Connection(this.configFactory());

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

  private configFactory() {
    return {
      host: 'localhost',
      port: 5432,
      user: 'my_user',
      password: '12345',
      database: 'genericRpg',
      timezone: 'Europe/Amsterdam'
    } as ConnectionConfiguration;
  }
}
