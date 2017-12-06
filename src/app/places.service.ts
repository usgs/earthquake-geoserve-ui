import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PlacesService {

  private placesUrl:string = 'https://dev-earthquake.cr.usgs.gov/ws/geoserve/places.json';

  private _places:BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor (private http: HttpClient) {}

  empty (): void {
    this._places.next(null);
  }

  places (): Observable<any> {
    return this._places.asObservable();
  }

  getPlaces (latitude: string, longitude: string): void {
    const url = this.buildUrl(latitude, longitude);

    this.http.get<any>(url).pipe(
      catchError(this.handleError('getPlaces', {}))
    ).subscribe((response) => {
      this._places.next(response.event.features);
    });
  }


  private handleError<T> (action:string = 'action', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  private buildUrl (latitude:string, longitude:string): string {
    return this.placesUrl + '?' +
      `latitude=${latitude}` +
      `&longitude=${longitude}` +
      '&type=event';
  }
}
