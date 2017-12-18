import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Coordinates } from './coordinates';

@Injectable()
export class RegionsService {

  public API_URL = 'https://earthquake.usgs.gov/ws/geoserve/regions.json';
  public adminRegionFlag = false;

  private _adminRegions: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _coordinates: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _tectonic: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public readonly adminRegions: Observable<any> =
      this._adminRegions.asObservable();
  public readonly coordinates: Observable<any> = this._coordinates.asObservable();
  public readonly tectonic: Observable<any> = this._tectonic.asObservable();


  constructor (private http: HttpClient) {}

  empty (): void {
    this._adminRegions.next(null);
    this._tectonic.next(null);
  }

  getRegions (latitude: string, longitude: string): void {
    const url = this.buildUrl(latitude, longitude);

    // set coordinates
    this._coordinates.next({
      latitude: latitude,
      longitude: longitude
    });

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getRegions', {}))
    ).subscribe((data) => {
      if (data.admin) {
        this.setRegionFlag(true);
        this._adminRegions.next(data.admin.features[0]);
      } else {
        this.setRegionFlag(false);
        this._adminRegions.next(null);
      }

      if (data.tectonic) {
        this._tectonic.next(data.tectonic.features[0]);
      } else {
        this._tectonic.next(null);
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
