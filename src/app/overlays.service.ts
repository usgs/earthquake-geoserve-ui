import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as L from 'leaflet';

@Injectable()
export class OverlaysService {
  public readonly LAYERS_URL = 'https://earthquake.usgs.gov/ws/geoserve/layers.json';
  private readonly COLORS = [
    '#1f78b4', // teal
    '#ffff99', // yellow
    '#33a02c', // green
    '#e31a1c', // red
    '#ff7f00', // orange
    '#6a3d9a', // purple
    '#b15928' // brown
  ];
  private COLORS_INDEX = 0;
  regionOverlays = {};

  private _overlays: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public readonly overlays: Observable<any> = this._overlays.asObservable();

  constructor(private http: HttpClient) { }

  empty (): void {
    this._overlays.next(null);
  }

  /**
   * Fetch overlays from geoserve ws
   */
  getOverlays(): void {
    let overlays;

    this.http.get<any>(this.LAYERS_URL).pipe(
      catchError(this.handleError('getOverlays',
        {
          parameters: {
            required: {
              type: {
                values: []
              }
            }
          }
        }
      ))
    ).subscribe((response) => {
      overlays = response.parameters.required.type.values;
      if (overlays && overlays.length !== 0) {
        this.buildRegionLayers(overlays);
      }
    });
  }

  private handleError<T> (action: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  /**
   * build an array of regions layers
   */
  buildRegionLayers(overlays: any[]): void {
    overlays.forEach((overlay) => {
      this.regionOverlays[overlay.title] = this.buildRegionLayer(overlay);
    });

    this._overlays.next(this.regionOverlays);
  }

  buildRegionLayer(overlay: any): void {
    const http = this.http;

    const RegionsLayer = L.GeoJSON.extend({
      // Not sure how to make angular call super class initialize,
      // so cheat and set defaults this way
      '_loaded': false,
      '_type': overlay.name,
      '_url': this.LAYERS_URL,
      'style': {
            'color': this.COLORS[this.COLORS_INDEX++ % this.COLORS.length],
            'fillOpacity': 0.4,
            'opacity': 1,
            'weight': 2,
            'clickable': false
      },

      onAdd: function (map) {
        if (!this._loaded) {
          // fetch data once
          this._loaded = true;
          this._loadData();
        }
      },

      _loadData: function () {
        let url;

        url = this._url + '?type=' + this._type;

        http.get(url).pipe(
          catchError(() => {
            return this.handleError('loadData', null);
          })
        ).subscribe((data) => {
          if (data === null) {
            // let user try again
            this._loaded = false;
            return;
          }
          this.addData(data[this._type]);
        });
      }
    });

    return new RegionsLayer();
  }

}
