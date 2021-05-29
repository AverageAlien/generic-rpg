import { Connection, ConnectionConfiguration } from 'postgresql-client';
import { from, Observable } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';

export class PgClient {
  public query<T>(command: string, params: any[] = []): Observable<T[]> {
    const connection = new Connection(this.configFactory());

    const observable = from(connection.connect())
      .pipe(
        mergeMap(() => connection.query(command, { params, objectRows: true })),
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
