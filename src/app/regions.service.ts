import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RegionsService {
  private baseUrl = 'https://earthquake.usgs.gov/ws/geoserve/regions.json';
  private regions = new BehaviorSubject<any>({});

  currentRegions = this.regions.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getRegions (latitude:string, longitude:string) {
    let url

    url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}`;

    this.http.get<any>(url).subscribe((data) => {
      this.regions.next(data);
    });
  }
}
