import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PgClient } from '../database/pgClient';
import { LocationDTO } from '../database/models/locationDTO';
import { DataTypeOIDs } from 'postgresql-client';

export class LocationDataService {
  constructor() {}

  loadLevelData(locationName: string): Observable<LocationDTO> {
    const client = new PgClient();

    const query = 'SELECT * FROM public.locations WHERE name = $1';

    const result = client
      .query<LocationDTO>(query, [{ value: locationName, type: DataTypeOIDs.varchar }])
      .pipe(
        map((r) => {
          if (r.length === 0) {
            return this.defaultLocation;
          }

          return r[0];
        })
      );

    return result;
  }

  private get defaultLocation(): LocationDTO {
    return {
      name: 'empty',
      locationtitle: 'Empty',
      leveldata: '{"l":[]}',
    };
  }
}
