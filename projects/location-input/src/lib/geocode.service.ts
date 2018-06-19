import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class GeocodeService {
  // Documentation:
  // https://developers.arcgis.com/rest/geocode/api-reference/geocoding-geocode-addresses.htm
  public readonly API_URL = 'https://geocode.arcgis.com/arcgis/rest/services/' +
      'World/GeocodeServer/find';

  private _location: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _error: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public readonly location: Observable<any> = this._location.asObservable();
  public readonly error: Observable<any> = this._error.asObservable();


  constructor (private http: HttpClient) {}


  buildUrl (address: string): string {
    return this.API_URL + '?' + `f=json` + `&text=${address}`;
  }

  checkLocation (address: string): void {
    if (!address || address === '') {
      // timeout is necessary for some reason
      setTimeout(() => {
        this._error.next('An address is required.');
        this._location.next(null);
      }, 0);
      return;
    }
  }

  empty (): void {
    this._location.next(null);
    this._error.next(null);
  }

  getLocation (address: string): void {
    const url = this.buildUrl(address);

    this.checkLocation(address);

    // make a geocode request
    this.http.get<any>(url).pipe(
      catchError(this.handleError('getLocation', { locations: null }))
    ).subscribe((response) => {
      if (response.locations && response.locations.length !== 0) {
        this._location.next(response.locations[0]);
      } else {
        this._error.next('No results. Please search again.');
        this._location.next(null);
      }
    });
  }

  handleError<T> (action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
