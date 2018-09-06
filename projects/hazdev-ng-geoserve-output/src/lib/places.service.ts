import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable()
export class PlacesService {
  public readonly PLACES_URL = environment.apiUrl + 'places.json';

  public places$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  empty(): void {
    this.places$.next(null);
  }

  getPlaces(latitude: number, longitude: number): void {
    const url = this.buildUrl(latitude, longitude);

    this.http
      .get<any>(url)
      .pipe(
        catchError(this.handleError('getPlaces', { event: { features: [] } }))
      )
      .subscribe(response => {
        this.places$.next(response.event.features);
      });
  }

  private handleError<T>(action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  buildUrl(latitude: number, longitude: number): string {
    // normalize longitude for search
    while (longitude <= -180) {
      longitude += 360;
    }
    while (longitude > 180) {
      longitude -= 360;
    }

    return (
      this.PLACES_URL +
      '?' +
      `latitude=${latitude}` +
      `&longitude=${longitude}` +
      '&type=event'
    );
  }
}
