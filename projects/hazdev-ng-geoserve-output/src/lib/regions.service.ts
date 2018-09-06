import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable()
export class RegionsService {
  public REGIONS_URL = environment.apiUrl + 'regions.json';

  public adminRegions$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public authoritative$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public neicCatalog$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public neicResponse$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public tectonic$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public offshoreRegions$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private http: HttpClient
  ) {}

  empty(): void {
    this.adminRegions$.next(null);
    this.authoritative$.next(null);
    this.neicCatalog$.next(null);
    this.neicResponse$.next(null);
    this.offshoreRegions$.next(null);
    this.tectonic$.next(null);
  }

  getRegions(latitude: number, longitude: number): void {
    const url = this.buildUrl(latitude, longitude);

    this.http
      .get<any>(url)
      .pipe(catchError(this.handleError('getRegions', {})))
      .subscribe(data => {
        if (data.admin) {
          this.adminRegions$.next(data.admin.features[0]);
        } else {
          this.adminRegions$.next(null);
        }
        if (data.neiccatalog) {
          this.neicCatalog$.next(data.neiccatalog.features[0]);
        } else {
          this.neicCatalog$.next(null);
        }
        if (data.neicresponse) {
          this.neicResponse$.next(data.neicresponse.features[0]);
        } else {
          this.neicResponse$.next(null);
        }
        if (data.tectonic) {
          this.tectonic$.next(data.tectonic.features[0]);
        } else {
          this.tectonic$.next(null);
        }
        if (data.offshore) {
          this.offshoreRegions$.next(data.offshore.features[0]);
        } else {
          this.offshoreRegions$.next(null);
        }
        if (data.authoritative) {
          this.authoritative$.next(data.authoritative.features[0]);
        } else {
          this.authoritative$.next(null);
        }
      });
  }

  private handleError<T>(action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(
        'RegionsService::handleError::' + action + '(' + error.message + ')'
      );
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
      this.REGIONS_URL +
      '?' +
      `latitude=${latitude}` +
      `&longitude=${longitude}`
    );
  }
}
