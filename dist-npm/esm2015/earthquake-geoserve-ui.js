import { Injectable, Component, Input, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false,
    apiUrl: 'https://earthquake.usgs.gov/ws/geoserve/',
    siteUrl: 'http://localhost.localdomain'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CoordinatesService {
    constructor() {
        this._coordinates = new BehaviorSubject(null);
        this.coordinates = this._coordinates.asObservable();
        /**
         * Constant used to indicate high degree of confidence.
         */
        this.HIGH_CONFIDENCE = 5;
        /**
         * Constant used to indicate above average confidence.
         */
        this.ABOVE_AVERAGE_CONFIDENCE = 4;
        /**
         * Constant used to indicate moderate degree of confidence.
         */
        this.AVERAGE_CONFIDENCE = 3;
        /**
         * Constant used to indicate below average confidence.
         */
        this.BELOW_AVERAGE_CONFIDENCE = 2;
        /**
         * Constant used to indicate low degree of confidence.
         */
        this.LOW_CONFIDENCE = 1;
        /**
         * Constant used to indicate very low degree of confidence.
         */
        this.NO_CONFIDENCE = 0;
        /**
         * Constant used to indicate confidence was not computed or an error occurred
         * while computing the confidence
         */
        this.NOT_COMPUTED = -1;
    }
    /**
     * Compute Confidence given latitude and longitude. Latitude and longitude
     * must be strings to keep accuracy.
     * Confidence is based on the number of digits past the decimal.
     *
     * \@params latititude {String}
     * \@params longitude {String}
     *
     * @param {?} latitude
     * @param {?} longitude
     * @return {?}
     */
    computeFromCoordinates(latitude, longitude) {
        if (typeof latitude !== 'string' || typeof longitude !== 'string') {
            return this.NOT_COMPUTED;
        }
        let /** @type {?} */ minDecimals;
        const /** @type {?} */ latitudePieces = latitude.split('.'), /** @type {?} */
        longitudePieces = longitude.split('.');
        if (latitudePieces.length === 1 || longitudePieces.length === 1) {
            minDecimals = 0;
        }
        else {
            minDecimals = Math.min(latitudePieces[1].length, longitudePieces[1].length);
        }
        if (minDecimals >= 5) {
            return this.HIGH_CONFIDENCE;
        }
        else if (minDecimals >= 4) {
            return this.ABOVE_AVERAGE_CONFIDENCE;
        }
        else if (minDecimals >= 3) {
            return this.AVERAGE_CONFIDENCE;
        }
        else if (minDecimals >= 2) {
            return this.BELOW_AVERAGE_CONFIDENCE;
        }
        else if (minDecimals >= 1) {
            return this.LOW_CONFIDENCE;
        }
        else if (minDecimals >= 0) {
            return this.NO_CONFIDENCE;
        }
        else {
            return this.NOT_COMPUTED;
        }
    }
    /**
     * Compute Confidence given a geocode result location with an extent.
     *
     * \@params geocodeLocation {object}
     *      an esri response via the ArcGIS REST API
     *
     * @see https://developers.arcgis.com/en/features/geocoding/
     * @param {?} geocodeLocation
     * @return {?}
     */
    computeFromGeocode(geocodeLocation) {
        let /** @type {?} */ confidence, /** @type {?} */
        extent, /** @type {?} */
        max;
        extent = geocodeLocation.extent;
        // find the largest dimension of the extent
        if (extent) {
            max = Math.max(Math.abs(extent.xmax - extent.xmin), Math.abs(extent.ymax - extent.ymin));
            // calculate confidence based on the location's extent
            if (max < 0.001) {
                confidence = this.HIGH_CONFIDENCE;
            }
            else if (max < 0.01) {
                confidence = this.ABOVE_AVERAGE_CONFIDENCE;
            }
            else if (max < 0.1) {
                confidence = this.AVERAGE_CONFIDENCE;
            }
            else if (max < 1) {
                confidence = this.BELOW_AVERAGE_CONFIDENCE;
            }
            else if (max < 10) {
                confidence = this.LOW_CONFIDENCE;
            }
            else if (max >= 10) {
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
     * Compute Confidence given a accuracy in meters.
     * used by GeoLocate.
     * \@params accuracy {number} indicates the accuracy in meters at 95%
     *         confidence.
     * @param {?} accuracy
     * @return {?}
     */
    computeFromGeolocate(accuracy) {
        if (accuracy > 100000) {
            return this.LOW_CONFIDENCE;
        }
        else if (accuracy > 10000) {
            return this.BELOW_AVERAGE_CONFIDENCE;
        }
        else if (accuracy > 1000) {
            return this.AVERAGE_CONFIDENCE;
        }
        else if (accuracy > 100) {
            return this.ABOVE_AVERAGE_CONFIDENCE;
        }
        else {
            return this.HIGH_CONFIDENCE;
        }
    }
    /**
     * Compute Confidence given a zoom level.
     * \@params zoom {number} indicates the zoom level of the map.
     * @param {?} zoom
     * @return {?}
     */
    computeFromPoint(zoom) {
        if (zoom > 16) {
            return this.HIGH_CONFIDENCE;
        }
        else if (zoom > 12) {
            return this.ABOVE_AVERAGE_CONFIDENCE;
        }
        else if (zoom > 8) {
            return this.AVERAGE_CONFIDENCE;
        }
        else if (zoom > 4) {
            return this.BELOW_AVERAGE_CONFIDENCE;
        }
        else {
            return this.LOW_CONFIDENCE;
        }
    }
    /**
     * Compute zoom level given a confidence.
     * \@params confidence {number} indicates the confidence level
     * @param {?} confidence
     * @return {?}
     */
    computeZoomFromConfidence(confidence) {
        if (confidence === this.HIGH_CONFIDENCE) {
            return 16;
        }
        else if (confidence === this.ABOVE_AVERAGE_CONFIDENCE) {
            return 13;
        }
        else if (confidence === this.AVERAGE_CONFIDENCE) {
            return 9;
        }
        else if (confidence === this.BELOW_AVERAGE_CONFIDENCE) {
            return 5;
        }
        else if (confidence === this.LOW_CONFIDENCE) {
            return 1;
        }
        else {
            return 1;
        }
    }
    /**
     * returns rounded value based on confidence value.
     *
     * \@params {string | number} value
     *           value to be rounded
     * \@params {number} confidence
     *           confidence value
     * \@returnn {number} rounded value
     *
     * @param {?} value
     * @param {?} confidence
     * @return {?}
     */
    roundLocation(value, confidence) {
        let /** @type {?} */ rounded, /** @type {?} */
        decimals = confidence;
        if (confidence === this.NOT_COMPUTED) {
            decimals = 0;
        }
        rounded = parseFloat(value).toFixed(decimals);
        return parseFloat(rounded);
    }
    /**
     * Set the coordinate observable.next value
     * \@params {string} latitude  [description]
     * \@params {string} longitude [description]
     * @param {?} location
     * @return {?}
     */
    setCoordinates(location) {
        let /** @type {?} */ confidence, /** @type {?} */
        latitude, /** @type {?} */
        longitude;
        confidence = location.confidence;
        latitude = this.roundLocation(+location.latitude, confidence);
        longitude = this.roundLocation(+location.longitude, confidence);
        this._coordinates.next({
            confidence: confidence,
            latitude: latitude,
            longitude: longitude,
            zoom: location.zoom,
            method: location.method,
            name: location.name
        });
    }
}
CoordinatesService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CoordinatesService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RegionsService {
    /**
     * @param {?} coordinatesService
     * @param {?} http
     */
    constructor(coordinatesService, http) {
        this.coordinatesService = coordinatesService;
        this.http = http;
        this.REGIONS_URL = environment.apiUrl + 'regions.json';
        this._adminRegions = new BehaviorSubject(null);
        this._authoritative = new BehaviorSubject(null);
        this._coordinates = new BehaviorSubject(null);
        this._neicCatalog = new BehaviorSubject(null);
        this._neicResponse = new BehaviorSubject(null);
        this._tectonic = new BehaviorSubject(null);
        this._offshoreRegions = new BehaviorSubject(null);
        this.adminRegions = this._adminRegions.asObservable();
        this.authoritative = this._authoritative.asObservable();
        this.coordinates = this._coordinates.asObservable();
        this.neicCatalog = this._neicCatalog.asObservable();
        this.neicResponse = this._neicResponse.asObservable();
        this.offshoreRegions = this._offshoreRegions.asObservable();
        this.tectonic = this._tectonic.asObservable();
        // subscribe to coordinates service
        this.coordinatesService.coordinates.subscribe((coordinates) => {
            // make request to regions service when coordinates update
            this.getRegions(coordinates.latitude, coordinates.longitude);
        });
    }
    /**
     * @return {?}
     */
    empty() {
        this._adminRegions.next(null);
        this._authoritative.next(null);
        this._neicCatalog.next(null);
        this._neicResponse.next(null);
        this._offshoreRegions.next(null);
        this._tectonic.next(null);
    }
    /**
     * @param {?} latitude
     * @param {?} longitude
     * @return {?}
     */
    getRegions(latitude, longitude) {
        const /** @type {?} */ url = this.buildUrl(latitude, longitude);
        this.http.get(url).pipe(catchError(this.handleError('getRegions', {}))).subscribe((data) => {
            if (data.admin) {
                this._adminRegions.next(data.admin.features[0]);
            }
            else {
                this._adminRegions.next(null);
            }
            if (data.neiccatalog) {
                this._neicCatalog.next(data.neiccatalog.features[0]);
            }
            else {
                this._neicCatalog.next(null);
            }
            if (data.neicresponse) {
                this._neicResponse.next(data.neicresponse.features[0]);
            }
            else {
                this._neicResponse.next(null);
            }
            if (data.tectonic) {
                this._tectonic.next(data.tectonic.features[0]);
            }
            else {
                this._tectonic.next(null);
            }
            if (data.offshore) {
                this._offshoreRegions.next(data.offshore.features[0]);
            }
            else {
                this._offshoreRegions.next(null);
            }
            if (data.authoritative) {
                this._authoritative.next(data.authoritative.features[0]);
            }
            else {
                this._authoritative.next(null);
            }
        });
    }
    /**
     * @template T
     * @param {?} action
     * @param {?=} result
     * @return {?}
     */
    handleError(action, result) {
        return (error) => {
            console.error('RegionsService::handleError::' + action + '(' + error.message + ')');
            return of(/** @type {?} */ (result));
        };
    }
    /**
     * @param {?} latitude
     * @param {?} longitude
     * @return {?}
     */
    buildUrl(latitude, longitude) {
        // normalize longitude for search
        while (longitude <= -180) {
            longitude += 360;
        }
        while (longitude > 180) {
            longitude -= 360;
        }
        return this.REGIONS_URL + '?' +
            `latitude=${latitude}` +
            `&longitude=${longitude}`;
    }
}
RegionsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RegionsService.ctorParameters = () => [
    { type: CoordinatesService, },
    { type: HttpClient, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AdminRegionComponent {
    /**
     * @param {?} regionsService
     */
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
AdminRegionComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-region',
                template: `<h2>Administrative Region</h2>
<div *ngIf="regionsService.adminRegions | async; else noAdminRegion;
    let adminRegions" class="output-section">
  <dl class="admin-region">
    <app-list-item TITLE="ISO" DATA="{{ adminRegions?.properties.iso }}">
    </app-list-item>
    <app-list-item TITLE="Region" DATA="{{ adminRegions?.properties.region }}">
    </app-list-item>
    <app-list-item TITLE="Country" DATA="{{ adminRegions?.properties.country }}">
    </app-list-item>
  </dl>
</div>
<!-- No administrative region was returned -->
<ng-template #noAdminRegion>
  <app-no-data></app-no-data>
<ng-template>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
AdminRegionComponent.ctorParameters = () => [
    { type: RegionsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AuthoritativeRegionComponent {
    /**
     * @param {?} regionsService
     */
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
AuthoritativeRegionComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-authoritative-region',
                template: `<h2>Authoritative Region</h2>
<div *ngIf="regionsService.authoritative | async; else noRegion;
    let region" class="output-section">
  <dl>
    <app-list-item TITLE="Name" DATA="{{ region?.properties.name }}">
    </app-list-item>
    <app-list-item TITLE="Network" DATA="{{ region?.properties.network }}">
    </app-list-item>
    <app-list-item TITLE="Type" DATA="{{ region?.properties.type }}">
    </app-list-item>
  </dl>
</div>
<ng-template #noRegion>
  <app-no-data></app-no-data>
</ng-template>`,
                styles: [``]
            },] },
];
/** @nocollapse */
AuthoritativeRegionComponent.ctorParameters = () => [
    { type: RegionsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LocationDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
LocationDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-location-dialog',
                template: `
<h1 mat-dialog-title>Choose a Location</h1>
<p>
  Use one of the methods below to add a location to the map.
</p>
<mat-dialog-content>
  <mat-accordion class="location-controls">
    <!-- Geolocate control panel -->
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon class="header-icon">my_location</mat-icon>
          Find Current Location
        </mat-panel-title>
      </mat-expansion-panel-header>
      <app-geolocate-input></app-geolocate-input>
    </mat-expansion-panel>
    <!-- Geocode control panel -->
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon class="header-icon">location_city</mat-icon>
          Search for an Address
        </mat-panel-title>
      </mat-expansion-panel-header>
      <app-geocode-input></app-geocode-input>
    </mat-expansion-panel>
    <!-- Coordinate Control panel -->
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon class="header-icon">language</mat-icon>
          Enter Coordinates
        </mat-panel-title>
      </mat-expansion-panel-header>
      <app-coordinate-input></app-coordinate-input>
    </mat-expansion-panel>
  </mat-accordion>
</mat-dialog-content>
<mat-dialog-actions>
  <button
    mat-raised-button
    color="primary"
    (click)="dialogRef.close()"
  >
    Close
  </button>
</mat-dialog-actions>`,
                styles: [`.location-controls{display:block;margin:2px 0 3px}.mat-dialog-container{background:#fafafa}.header-icon{color:#666;margin:0 1em 0 0}.location-controls mat-panel-title{-webkit-box-align:center;-ms-flex-align:center;align-items:center}`]
            },] },
];
/** @nocollapse */
LocationDialogComponent.ctorParameters = () => [
    { type: MatDialogRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GeoserveOutputComponent {
    /**
     * @param {?} coordinatesService
     * @param {?} dialog
     */
    constructor(coordinatesService, dialog) {
        this.coordinatesService = coordinatesService;
        this.dialog = dialog;
    }
    /**
     * @param {?} coordinates
     * @return {?}
     */
    set coordinates(coordinates) {
        if (coordinates) {
            this.coordinatesService.setCoordinates(coordinates);
        }
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.dialog && LocationDialogComponent) {
            this.dialog.open(LocationDialogComponent);
        }
    }
}
GeoserveOutputComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-geoserve-output',
                template: `<div *ngIf="coordinatesService.coordinates | async; else noCoordinates">
  <app-location-output></app-location-output>
  <app-admin-region></app-admin-region>
  <app-authoritative-region></app-authoritative-region>
  <app-nearby-places></app-nearby-places>
  <app-neic-catalog-region></app-neic-catalog-region>
  <app-neic-response-region></app-neic-response-region>
  <app-offshore-region></app-offshore-region>
  <app-tectonic-summary-region></app-tectonic-summary-region>
</div>
<ng-template #noCoordinates>
  <p class="alert info">
    To select a location, click the
    <button mat-raised-button class="icon-button" (click)="onClick()">
      <i class="material-icons">location_searching</i>
    </button>on the map.
  </p>
</ng-template>`,
                styles: [``]
            },] },
];
/** @nocollapse */
GeoserveOutputComponent.ctorParameters = () => [
    { type: CoordinatesService, },
    { type: MatDialog, },
];
GeoserveOutputComponent.propDecorators = {
    "coordinates": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ListItemComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-list-item',
                template: `<dt class="title">{{ TITLE }}</dt>
<dd class="data">{{ DATA }}</dd>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ListItemComponent.ctorParameters = () => [];
ListItemComponent.propDecorators = {
    "TITLE": [{ type: Input },],
    "DATA": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LocationOutputComponent {
    /**
     * @param {?} coordinatesService
     */
    constructor(coordinatesService) {
        this.coordinatesService = coordinatesService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
LocationOutputComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-location-output',
                template: `<div *ngIf="coordinatesService.coordinates | async; let coordinates" class="location-output">
  <h2>Location</h2>
  <p class="coordinates alert success">
    (
      {{ coordinates?.latitude }},
      {{ coordinates?.longitude }}
    )
  </p>
</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
LocationOutputComponent.ctorParameters = () => [
    { type: CoordinatesService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NearbyPlaceComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} place
     * @return {?}
     */
    getName(place) {
        return (place.properties.name + ', '
            + place.properties.admin1_name + ', '
            + place.properties.country_name);
    }
    /**
     * @param {?} place
     * @return {?}
     */
    getDistance(place) {
        const /** @type {?} */ distanceKm = place.properties.distance;
        return (this.round(distanceKm, 1) + 'km '
            + '(' + this.round(this.kmToMi(distanceKm), 1) + 'mi) '
            + this.compassWinds(place.properties.azimuth));
    }
    /**
     * @param {?} place
     * @return {?}
     */
    getPopulation(place) {
        return 'Population: ' + place.properties.population;
    }
    /**
     * @param {?} azimuth
     * @return {?}
     */
    compassWinds(azimuth) {
        const /** @type {?} */ fullwind = 22.5;
        const /** @type {?} */ directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
            'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
        // if direction is already in compass points
        if (directions.indexOf(azimuth) > -1) {
            return azimuth;
        }
        return directions[(Math.round((azimuth % 360) / fullwind))];
    }
    /**
     * @param {?} km
     * @return {?}
     */
    kmToMi(km) {
        return km * 0.621371;
    }
    /**
     * @param {?} raw
     * @param {?} decimals
     * @return {?}
     */
    round(raw, decimals) {
        const /** @type {?} */ factor = Math.pow(10, decimals);
        return Math.round(raw * factor) / factor;
    }
}
NearbyPlaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-nearby-place',
                template: `<span class="name">{{ getName(place) }}</span>
<aside class="distance">{{ getDistance(place) }}</aside>
<aside class="population">{{ getPopulation(place) }}</aside>
`,
                styles: [`.name{display:block}.distance,.population{color:#666;display:block;float:left;font-size:smaller}.population{float:right}`]
            },] },
];
/** @nocollapse */
NearbyPlaceComponent.ctorParameters = () => [];
NearbyPlaceComponent.propDecorators = {
    "place": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlacesService {
    /**
     * @param {?} coordinatesService
     * @param {?} http
     */
    constructor(coordinatesService, http) {
        this.coordinatesService = coordinatesService;
        this.http = http;
        this.PLACES_URL = environment.apiUrl + 'places.json';
        this._places = new BehaviorSubject(null);
        this.places = this._places.asObservable();
        // subscribe to coordinates service
        this.coordinatesService.coordinates.subscribe((coordinates) => {
            // make request to places service when coordinates update
            this.getPlaces(coordinates.latitude, coordinates.longitude);
        });
    }
    /**
     * @return {?}
     */
    empty() {
        this._places.next(null);
    }
    /**
     * @param {?} latitude
     * @param {?} longitude
     * @return {?}
     */
    getPlaces(latitude, longitude) {
        const /** @type {?} */ url = this.buildUrl(latitude, longitude);
        this.http.get(url).pipe(catchError(this.handleError('getPlaces', { event: { features: [] } }))).subscribe((response) => {
            this._places.next(response.event.features);
        });
    }
    /**
     * @template T
     * @param {?} action
     * @param {?=} result
     * @return {?}
     */
    handleError(action, result) {
        return (error) => {
            console.error(error);
            return of(/** @type {?} */ (result));
        };
    }
    /**
     * @param {?} latitude
     * @param {?} longitude
     * @return {?}
     */
    buildUrl(latitude, longitude) {
        // normalize longitude for search
        while (longitude <= -180) {
            longitude += 360;
        }
        while (longitude > 180) {
            longitude -= 360;
        }
        return this.PLACES_URL + '?' +
            `latitude=${latitude}` +
            `&longitude=${longitude}` +
            '&type=event';
    }
}
PlacesService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PlacesService.ctorParameters = () => [
    { type: CoordinatesService, },
    { type: HttpClient, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NearbyPlacesComponent {
    /**
     * @param {?} placesService
     */
    constructor(placesService) {
        this.placesService = placesService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NearbyPlacesComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-nearby-places',
                template: `<h2>Nearby Places</h2>
<div *ngIf="placesService.places | async; else noNearbyPlaces">
  <ol>
    <li *ngFor="let place of placesService.places | async">
      <app-nearby-place [place]="place"></app-nearby-place>
    </li>
  </ol>
</div>
<ng-template #noNearbyPlaces>
  <app-no-data></app-no-data>
</ng-template>
`,
                styles: [`ol{list-style:none;padding:0}li{clear:both;margin-bottom:.5em;overflow:hidden}`]
            },] },
];
/** @nocollapse */
NearbyPlacesComponent.ctorParameters = () => [
    { type: PlacesService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NeicCatalogRegionComponent {
    /**
     * @param {?} regionsService
     */
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NeicCatalogRegionComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-neic-catalog-region',
                template: `<!-- NEIC Catalog region was returned, display the region -->
<h2>NEIC Catalog Region</h2>
<div *ngIf="regionsService.neicCatalog | async; else noRegion;
    let region "class="output-section">
  <dl class="neic-catalog-region">
    <app-list-item TITLE="Name" DATA="{{ region?.properties.name }}">
    </app-list-item>
    <app-list-item TITLE="Type" DATA="{{ region?.properties.type }}">
    </app-list-item>
    <app-list-item TITLE="Magnitude" DATA="{{ region?.properties.magnitude }}">
    </app-list-item>
  </dl>
</div>
<!-- No NEIC Catalog region was returned -->
<ng-template #noRegion>
  <app-no-data></app-no-data>
</ng-template>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
NeicCatalogRegionComponent.ctorParameters = () => [
    { type: RegionsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NeicResponseRegionComponent {
    /**
     * @param {?} regionsService
     */
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NeicResponseRegionComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-neic-response-region',
                template: `<!-- NEIC Response region was returned, display the region -->
<h2>NEIC Response Region</h2>
<div *ngIf="regionsService.neicResponse | async; else noRegion;
    let region" class="output-section">
  <dl class="neic-response-region">
    <app-list-item TITLE="Name" DATA="{{ region?.properties.name }}">
    </app-list-item>
    <app-list-item TITLE="Magnitude" DATA="{{ region?.properties.magnitude }}">
    </app-list-item>
    <app-list-item TITLE="Type" DATA="{{ region?.properties.type }}">
    </app-list-item>
  </dl>
</div>
<!-- No administrative region was returned -->
<ng-template #noRegion>
  <app-no-data></app-no-data>
</ng-template>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
NeicResponseRegionComponent.ctorParameters = () => [
    { type: RegionsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NoDataComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NoDataComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-no-data',
                template: `<div  class="no-data">
  <p>
    Data not available.
  </p>
</div>`,
                styles: [``]
            },] },
];
/** @nocollapse */
NoDataComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class OffshoreRegionComponent {
    /**
     * @param {?} regionsService
     */
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
OffshoreRegionComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-offshore-region',
                template: `<!-- Offshore region was returned, display the region -->
<h2>Offshore Region</h2>
<div *ngIf="regionsService.offshoreRegions | async; else noOffshoreRegion;
    let offshoreRegions" class="output-section">
  <dl class="offshore-region">
    <app-list-item TITLE="Name" DATA="{{ offshoreRegions?.properties.name }}">
    </app-list-item>
  </dl>
</div>
<!-- No offshore region was returned -->
<ng-template #noOffshoreRegion>
  <app-no-data></app-no-data>
</ng-template>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
OffshoreRegionComponent.ctorParameters = () => [
    { type: RegionsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TectonicSummaryRegionComponent {
    /**
     * @param {?} regionsService
     */
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
TectonicSummaryRegionComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-tectonic-summary-region',
                template: `<h2>Tectonic Summary</h2>
<div *ngIf="regionsService.tectonic | async; else noTectonic; let tectonic"
    class="tectonic-output">
  <div [innerHTML]="tectonic?.properties.summary">
  </div>
</div>
<ng-template #noTectonic>
  <app-no-data></app-no-data>
</ng-template>`,
                styles: [``]
            },] },
];
/** @nocollapse */
TectonicSummaryRegionComponent.ctorParameters = () => [
    { type: RegionsService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GeoserveOutputModule {
}
GeoserveOutputModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    AdminRegionComponent,
                    AuthoritativeRegionComponent,
                    GeoserveOutputComponent,
                    ListItemComponent,
                    LocationOutputComponent,
                    NearbyPlaceComponent,
                    NearbyPlacesComponent,
                    NeicCatalogRegionComponent,
                    NeicResponseRegionComponent,
                    NoDataComponent,
                    OffshoreRegionComponent,
                    TectonicSummaryRegionComponent
                ],
                exports: [
                    AdminRegionComponent,
                    AuthoritativeRegionComponent,
                    GeoserveOutputComponent,
                    LocationOutputComponent,
                    NearbyPlaceComponent,
                    NearbyPlacesComponent,
                    NeicCatalogRegionComponent,
                    NeicResponseRegionComponent,
                    NoDataComponent,
                    OffshoreRegionComponent,
                    TectonicSummaryRegionComponent
                ],
                providers: [
                    CoordinatesService,
                    PlacesService,
                    RegionsService
                ]
            },] },
];
/** @nocollapse */
GeoserveOutputModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { GeoserveOutputModule, CoordinatesService as ɵc, AdminRegionComponent as ɵa, AuthoritativeRegionComponent as ɵd, GeoserveOutputComponent as ɵe, ListItemComponent as ɵf, LocationOutputComponent as ɵg, NearbyPlaceComponent as ɵh, NearbyPlacesComponent as ɵi, NeicCatalogRegionComponent as ɵk, NeicResponseRegionComponent as ɵl, NoDataComponent as ɵm, OffshoreRegionComponent as ɵn, TectonicSummaryRegionComponent as ɵo, PlacesService as ɵj, RegionsService as ɵb };
//# sourceMappingURL=earthquake-geoserve-ui.js.map
