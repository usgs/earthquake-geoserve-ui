import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class RegionsService {

  public API_URL = 'https://earthquake.usgs.gov/ws/geoserve/regions.json';

  private _regions: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _adminRegions: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public readonly adminRegions: Observable<any> =
      this._adminRegions.asObservable();

  public readonly currentRegions: Observable<any> =
      this._regions.asObservable();

  constructor (private http: HttpClient) {}

  empty (): void {
    this._regions.next(null);
  }

  getRegions (latitude:string, longitude:string): void {
    const url = this.buildUrl(latitude, longitude);

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getRegions', {event: {features: []}}))
    ).subscribe((data) => {
      console.log(data);
      this._regions.next(data);

      if (data.admin) {
        console.log('sending: ', data.admin.features[0]);
        this._adminRegions.next(data.admin.features[0]);
      } else {
        console.log('sending: null');
        this._adminRegions.next(null);
      }
    });
  }


  private handleError<T> (action: string, result?: T) {
    return(error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private buildUrl (latitude: string, longitude: string): string {
    return this.API_URL + '?' +
      `latitude=${latitude}` +
      `&longitude=${longitude}`;
  }
}
