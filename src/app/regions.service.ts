import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class RegionsService {

  public API_URL = 'https://earthquake.usgs.gov/ws/geoserve/regions.json';

  private _adminRegions: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _authoritative: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _coordinates: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _neicCatalog: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _neicResponse: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _tectonic: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _offshoreRegions: BehaviorSubject<any> =
      new BehaviorSubject<any>(null);

  public readonly adminRegions: Observable<any> =
      this._adminRegions.asObservable();
  public readonly authoritative: Observable<any> =
      this._authoritative.asObservable();
  public readonly coordinates: Observable<any> =
      this._coordinates.asObservable();
  public readonly neicCatalog: Observable<any> =
      this._neicCatalog.asObservable();
  public readonly neicResponse: Observable<any> =
      this._neicResponse.asObservable();
  public readonly offshoreRegions: Observable<any> =
      this._offshoreRegions.asObservable();
  public readonly tectonic: Observable<any> =
      this._tectonic.asObservable();



  constructor (private http: HttpClient) {}

  empty (): void {
    this._adminRegions.next(null);
    this._authoritative.next(null);
    this._neicCatalog.next(null);
    this._neicResponse.next(null);
    this._offshoreRegions.next(null);
    this._tectonic.next(null);
  }

  getRegions (latitude: string, longitude: string): void {
    const url = this.buildUrl(latitude, longitude);

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getRegions', {}))
    ).subscribe((data) => {
      if (data.admin) {
        this._adminRegions.next(data.admin.features[0]);
      } else {
        this._adminRegions.next(null);
      }
      if (data.neiccatalog) {
        this._neicCatalog.next(data.neiccatalog.features[0]);
      } else {
        this._neicCatalog.next(null);
      }
      if (data.neicresponse) {
        this._neicResponse.next(data.neicresponse.features[0]);
      } else {
        this._neicResponse.next(null);
      }
      if (data.tectonic) {
        this._tectonic.next(data.tectonic.features[0]);
      } else {
        this._tectonic.next(null);
      }
      if (data.offshore) {
        this._offshoreRegions.next(data.offshore.features[0]);
      } else {
        this._offshoreRegions.next(null);
      }
      if (data.authoritative) {
        this._authoritative.next(data.authoritative.features[0]);
      } else {
        this._authoritative.next(null);
      }
    });
  }

  private handleError<T> (action: string, result?: T) {
    return(error: any): Observable<T> => {
      console.error('RegionsService::handleError::' + action + '(' + error.message + ')');
      return of(result as T);
    };
  }

  private buildUrl (latitude: string, longitude: string): string {
    return this.API_URL + '?' +
      `latitude=${latitude}` +
      `&longitude=${longitude}`;
  }
}
