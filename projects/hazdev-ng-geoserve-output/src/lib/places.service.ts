import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Place } from './place';
import { PlacesJson } from './places-json';
import { Feature } from './feature';

@Injectable()
export class PlacesService {
  places$ = new BehaviorSubject<Place[]>(null);

  readonly PLACES_URL = environment.apiUrl + 'places.json';

  referencePlace: Place;

  constructor(private http: HttpClient) {}

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

  empty(): void {
    this.places$.next(null);
  }

  getPlaces(latitude: number, longitude: number): void {
    const url = this.buildUrl(latitude, longitude);

    this.http
      .get<PlacesJson>(url)
      .pipe(
        catchError(this.handleError('getPlaces', { event: { features: [] } }))
      )
      .subscribe((response: PlacesJson) => {
        const places = response.event.features.map(
          (feature: Feature): Place => {
            const place: Place = Object.assign({}, feature.properties);
            if (feature.geometry && feature.geometry.coordinates) {
              const coords = feature.geometry.coordinates;
              place.elevation = coords[2];
              place.latitude = coords[1];
              place.longitude = coords[0];
            }
            return place;
          }
        );

        this.referencePlace = {
          latitude,
          longitude
        };
        this.places$.next(places);
      });
  }

  private handleError<T>(action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
