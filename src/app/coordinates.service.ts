import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Coordinates } from './coordinates';
import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';


@Injectable()
export class CoordinatesService {

  private _coordinates: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public readonly coordinates: Observable<Coordinates> = this._coordinates.asObservable();


  constructor(
    private placesService: PlacesService,
    private regionsService: RegionsService
  ) {}

  // ----------------------------------------------------------------------
  // Public Static Variables
  // ----------------------------------------------------------------------

  /** Constant used to indicate high degree of confidence. */
  HIGH_CONFIDENCE = 5;

  /** Constant used to indicate above average confidence. */
  ABOVE_AVERAGE_CONFIDENCE = 4;

  /** Constant used to indicate moderate degree of confidence. */
  AVERAGE_CONFIDENCE = 3;

  /** Constant used to indicate below average confidence. */
  BELOW_AVERAGE_CONFIDENCE = 2;

  /** Constant used to indicate low degree of confidence. */
  LOW_CONFIDENCE = 1;

  /** Constant used to indicate very low degree of confidence. */
  NO_CONFIDENCE = 0;

  /**
   * Constant used to indicate confidence was not computed or an error occurred
   * while computing the confidence
   */
  NOT_COMPUTED = -1;

  /**
   * Compute Confidence given latitude and longitude. Latitude and longitude
   * must be strings to keep accuracy.
   * Confidence is based on the number of digits past the decimal.
   *
   * @params latititude {String}
   * @params longitude {String}
   *
   */
  public computeFromCoordinates (location: Coordinates): number {
    let latitude,
        longitude;

    latitude = location.latitude.toString();
    longitude = location.longitude.toString();

    if (typeof latitude !== 'string' || typeof longitude !== 'string') {
      return this.NOT_COMPUTED;
    }

    let minDecimals;

    const latitudePieces = latitude.split('.'),
        longitudePieces = longitude.split('.');

    if (latitudePieces.length === 1 || longitudePieces.length === 1) {
      minDecimals = 0;
    } else {
      minDecimals = Math.min(latitudePieces[1].length,
          longitudePieces[1].length);
    }


    if (minDecimals >= 5) {
      return this.HIGH_CONFIDENCE;
    } else if (minDecimals >= 4) {
      return this.ABOVE_AVERAGE_CONFIDENCE;
    } else if (minDecimals >= 3) {
      return this.AVERAGE_CONFIDENCE;
    } else if (minDecimals >= 2) {
      return this.BELOW_AVERAGE_CONFIDENCE;
    } else if (minDecimals >= 1) {
      return this.LOW_CONFIDENCE;
    } else if (minDecimals >= 0) {
      return this.NO_CONFIDENCE;
    } else {
      return this.NOT_COMPUTED;
    }
  }


  /**
   * Compute Confidence given a accuracy in meters.
   * used by GeoLocate.
   * @params accuracy {number} indicates the accuracy in meters at 95%
   *         confidence.
   */
  public computeFromGeolocate (accuracy): number {
    if (accuracy > 100000) {
      return this.LOW_CONFIDENCE;
    } else if (accuracy > 10000) {
      return this.BELOW_AVERAGE_CONFIDENCE;
    } else if (accuracy > 1000) {
      return this.AVERAGE_CONFIDENCE;
    } else if (accuracy > 100) {
      return this.ABOVE_AVERAGE_CONFIDENCE;
    } else {
      return this.HIGH_CONFIDENCE;
    }
  }


  /**
   * Compute zoom level given a confidence.
   * @params confidence {number} indicates the confidence level
   */
  public computeZoomFromConfidence (confidence: number): number {
    if (confidence === this.HIGH_CONFIDENCE) {
      return 16;
    } else if (confidence === this.ABOVE_AVERAGE_CONFIDENCE) {
      return 13;
    } else if (confidence === this.AVERAGE_CONFIDENCE) {
      return 9;
    } else if (confidence === this.BELOW_AVERAGE_CONFIDENCE) {
      return 5;
    } else if (confidence === this.LOW_CONFIDENCE) {
      return 1;
    } else {
      return 1;
    }
  }

  /**
   * Set the coordinate observable.next value
   * @param {string} latitude  [description]
   * @param {string} longitude [description]
   */
  public setCoordinates (location: any): void {
    let confidence,
        latitude,
        longitude,
        zoom;

    confidence = this.computeConfidence(location);
    latitude = +location.latitude;
    longitude = +location.longitude;

    if (location.zoom && location.method === 'point') {
      zoom = location.zoom;
    } else {
      zoom = this.computeZoomFromConfidence(confidence);
    }

    this._coordinates.next({
      confidence: confidence,
      latitude: this.roundLocation(latitude, confidence),
      longitude: this.roundLocation(longitude, confidence),
      zoom: zoom,
      method: location.method
    });

    this.placesService.getPlaces(latitude, longitude);
    this.regionsService.getRegions(latitude, longitude);
  }

  public computeConfidence (location: Coordinates): number {
    let confidence,
        method;

    method = location.method;

    if (method === 'coordinate') {
      confidence = this.computeFromCoordinates(location);
    } else if (method === 'geocode') {
      confidence = this.computeFromGeocode(location);
    } else if (method === 'geolocate') {
      confidence = this.computeFromGeolocate(location);
    } else if (method === 'point') {
      confidence = this.computeFromPoint(location);
    }

    return confidence;
  }



  /**
   * Compute Confidence given a zoom level.
   * @params zoom {number} indicates the zoom level of the map.
   */
  public computeFromPoint (location: Coordinates): number {
    let zoom;

    zoom = location.zoom;

    if (zoom > 16) {
      return this.HIGH_CONFIDENCE;
    } else if (zoom > 12) {
      return this.ABOVE_AVERAGE_CONFIDENCE;
    } else if (zoom > 8) {
      return this.AVERAGE_CONFIDENCE;
    } else if (zoom > 4) {
      return this.BELOW_AVERAGE_CONFIDENCE;
    } else {
      return this.LOW_CONFIDENCE;
    }
  }


  /**
   * Compute Confidence given a geocode result location with an extent.
   *
   * @params geocodeLocation {object}
   *      an esri response via the ArcGIS REST API
   *
   * @see https://developers.arcgis.com/en/features/geocoding/
   */
  public computeFromGeocode (geocodeLocation: any): number {
    var confidence,
        extent,
        max;

    extent = geocodeLocation.extent;

    // find the largest dimension of the extent
    if (extent) {
      max = Math.max(Math.abs(extent.xmax - extent.xmin),
          Math.abs(extent.ymax - extent.ymin));

      // calculate confidence based on the location's extent
      if (max < 0.001) {
        confidence = this.HIGH_CONFIDENCE;
      } else if (max < 0.01) {
        confidence = this.ABOVE_AVERAGE_CONFIDENCE;
      } else if (max < 0.1) {
        confidence = this.AVERAGE_CONFIDENCE;
      } else if (max < 1) {
        confidence = this.BELOW_AVERAGE_CONFIDENCE;
      } else if (max < 10) {
        confidence = this.LOW_CONFIDENCE;
      } else if (max >= 10) {
        confidence = this.NO_CONFIDENCE;
      }
    }

    if (!(confidence === this.HIGH_CONFIDENCE ||
        confidence === this.ABOVE_AVERAGE_CONFIDENCE ||
        confidence === this.AVERAGE_CONFIDENCE ||
        confidence === this.BELOW_AVERAGE_CONFIDENCE ||
        confidence === this.LOW_CONFIDENCE ||
        confidence === this.NO_CONFIDENCE)) {
      // confidence did not match any value, bail
      confidence = this.NOT_COMPUTED;
    }

    return confidence;
  }


  /**
   * returns rounded value based on confidence value.
   *
   * @param  {string | number} value
   *           value to be rounded
   * @param  {number} confidence
   *           confidence value
   * @return {number} rounded value
   *
   */
  public roundLocation (value, confidence): number {
    var rounded,
        decimals = confidence;

    if (confidence === this.NOT_COMPUTED) {
      decimals = 0;
    }

    rounded = parseFloat(value).toFixed(decimals);
    return parseFloat(rounded);
  }

}
