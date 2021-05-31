import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PgClient } from '../database/databaseClient';
import { LocationDTO } from '../database/models/locationDTO';

export class LocationDataService {
  constructor() {}

  loadLevelData(locationName: string): Observable<LocationDTO> {
    const client = new PgClient();

    const query = `SELECT * FROM public.locations WHERE name = '${locationName}'`;

    const result = client.query<LocationDTO>(query).pipe(
      map(r => {
        if (r.length === 0) {
          return this.defaultLocation;
        }

        return r[0];
      }));

    return result;
  }

  private get defaultLocation(): LocationDTO {
    return {
      name: 'empty',
      locationTitle: 'Empty',
      levelData: '{"l":[]}'
    };
  }
}