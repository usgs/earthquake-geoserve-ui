(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/BehaviorSubject'), require('@angular/common/http'), require('rxjs/observable/of'), require('rxjs/operators'), require('@angular/material'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/BehaviorSubject', '@angular/common/http', 'rxjs/observable/of', 'rxjs/operators', '@angular/material', '@angular/common'], factory) :
	(factory((global['earthquake-geoserve-ui'] = {}),global.ng.core,global.Rx,global.ng.common.http,global.Rx.Observable,global.Rx.Observable.prototype,global.ng.material,global.ng.common));
}(this, (function (exports,core,BehaviorSubject,http,of,operators,material,common) { 'use strict';

var environment = {
    production: false,
    apiUrl: 'https://earthquake.usgs.gov/ws/geoserve/',
    siteUrl: 'http://localhost.localdomain'
};
var CoordinatesService = (function () {
    function CoordinatesService() {
        this._coordinates = new BehaviorSubject.BehaviorSubject(null);
        this.coordinates = this._coordinates.asObservable();
        this.HIGH_CONFIDENCE = 5;
        this.ABOVE_AVERAGE_CONFIDENCE = 4;
        this.AVERAGE_CONFIDENCE = 3;
        this.BELOW_AVERAGE_CONFIDENCE = 2;
        this.LOW_CONFIDENCE = 1;
        this.NO_CONFIDENCE = 0;
        this.NOT_COMPUTED = -1;
    }
    CoordinatesService.prototype.computeFromCoordinates = function (latitude, longitude) {
        if (typeof latitude !== 'string' || typeof longitude !== 'string') {
            return this.NOT_COMPUTED;
        }
        var minDecimals;
        var latitudePieces = latitude.split('.'), longitudePieces = longitude.split('.');
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
    };
    CoordinatesService.prototype.computeFromGeocode = function (geocodeLocation) {
        var confidence, extent, max;
        extent = geocodeLocation.extent;
        if (extent) {
            max = Math.max(Math.abs(extent.xmax - extent.xmin), Math.abs(extent.ymax - extent.ymin));
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
            confidence = this.NOT_COMPUTED;
        }
        return confidence;
    };
    CoordinatesService.prototype.computeFromGeolocate = function (accuracy) {
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
    };
    CoordinatesService.prototype.computeFromPoint = function (zoom) {
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
    };
    CoordinatesService.prototype.computeZoomFromConfidence = function (confidence) {
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
    };
    CoordinatesService.prototype.roundLocation = function (value, confidence) {
        var rounded, decimals = confidence;
        if (confidence === this.NOT_COMPUTED) {
            decimals = 0;
        }
        rounded = parseFloat(value).toFixed(decimals);
        return parseFloat(rounded);
    };
    CoordinatesService.prototype.setCoordinates = function (location) {
        var confidence, latitude, longitude;
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
    };
    return CoordinatesService;
}());
CoordinatesService.decorators = [
    { type: core.Injectable },
];
CoordinatesService.ctorParameters = function () { return []; };
var RegionsService = (function () {
    function RegionsService(coordinatesService, http$$1) {
        var _this = this;
        this.coordinatesService = coordinatesService;
        this.http = http$$1;
        this.REGIONS_URL = environment.apiUrl + 'regions.json';
        this._adminRegions = new BehaviorSubject.BehaviorSubject(null);
        this._authoritative = new BehaviorSubject.BehaviorSubject(null);
        this._coordinates = new BehaviorSubject.BehaviorSubject(null);
        this._neicCatalog = new BehaviorSubject.BehaviorSubject(null);
        this._neicResponse = new BehaviorSubject.BehaviorSubject(null);
        this._tectonic = new BehaviorSubject.BehaviorSubject(null);
        this._offshoreRegions = new BehaviorSubject.BehaviorSubject(null);
        this.adminRegions = this._adminRegions.asObservable();
        this.authoritative = this._authoritative.asObservable();
        this.coordinates = this._coordinates.asObservable();
        this.neicCatalog = this._neicCatalog.asObservable();
        this.neicResponse = this._neicResponse.asObservable();
        this.offshoreRegions = this._offshoreRegions.asObservable();
        this.tectonic = this._tectonic.asObservable();
        this.coordinatesService.coordinates.subscribe(function (coordinates) {
            _this.getRegions(coordinates.latitude, coordinates.longitude);
        });
    }
    RegionsService.prototype.empty = function () {
        this._adminRegions.next(null);
        this._authoritative.next(null);
        this._neicCatalog.next(null);
        this._neicResponse.next(null);
        this._offshoreRegions.next(null);
        this._tectonic.next(null);
    };
    RegionsService.prototype.getRegions = function (latitude, longitude) {
        var _this = this;
        var url = this.buildUrl(latitude, longitude);
        this.http.get(url).pipe(operators.catchError(this.handleError('getRegions', {}))).subscribe(function (data) {
            if (data.admin) {
                _this._adminRegions.next(data.admin.features[0]);
            }
            else {
                _this._adminRegions.next(null);
            }
            if (data.neiccatalog) {
                _this._neicCatalog.next(data.neiccatalog.features[0]);
            }
            else {
                _this._neicCatalog.next(null);
            }
            if (data.neicresponse) {
                _this._neicResponse.next(data.neicresponse.features[0]);
            }
            else {
                _this._neicResponse.next(null);
            }
            if (data.tectonic) {
                _this._tectonic.next(data.tectonic.features[0]);
            }
            else {
                _this._tectonic.next(null);
            }
            if (data.offshore) {
                _this._offshoreRegions.next(data.offshore.features[0]);
            }
            else {
                _this._offshoreRegions.next(null);
            }
            if (data.authoritative) {
                _this._authoritative.next(data.authoritative.features[0]);
            }
            else {
                _this._authoritative.next(null);
            }
        });
    };
    RegionsService.prototype.handleError = function (action, result) {
        return function (error) {
            console.error('RegionsService::handleError::' + action + '(' + error.message + ')');
            return of.of((result));
        };
    };
    RegionsService.prototype.buildUrl = function (latitude, longitude) {
        while (longitude <= -180) {
            longitude += 360;
        }
        while (longitude > 180) {
            longitude -= 360;
        }
        return this.REGIONS_URL + '?' +
            ("latitude=" + latitude) +
            ("&longitude=" + longitude);
    };
    return RegionsService;
}());
RegionsService.decorators = [
    { type: core.Injectable },
];
RegionsService.ctorParameters = function () { return [
    { type: CoordinatesService, },
    { type: http.HttpClient, },
]; };
var AdminRegionComponent = (function () {
    function AdminRegionComponent(regionsService) {
        this.regionsService = regionsService;
    }
    AdminRegionComponent.prototype.ngOnInit = function () {
    };
    return AdminRegionComponent;
}());
AdminRegionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-admin-region',
                template: "<h2>Administrative Region</h2>\n<div *ngIf=\"regionsService.adminRegions | async; else noAdminRegion;\n    let adminRegions\" class=\"output-section\">\n  <dl class=\"admin-region\">\n    <app-list-item TITLE=\"ISO\" DATA=\"{{ adminRegions?.properties.iso }}\">\n    </app-list-item>\n    <app-list-item TITLE=\"Region\" DATA=\"{{ adminRegions?.properties.region }}\">\n    </app-list-item>\n    <app-list-item TITLE=\"Country\" DATA=\"{{ adminRegions?.properties.country }}\">\n    </app-list-item>\n  </dl>\n</div>\n<!-- No administrative region was returned -->\n<ng-template #noAdminRegion>\n  <app-no-data></app-no-data>\n<ng-template>\n",
                styles: [""]
            },] },
];
AdminRegionComponent.ctorParameters = function () { return [
    { type: RegionsService, },
]; };
var AuthoritativeRegionComponent = (function () {
    function AuthoritativeRegionComponent(regionsService) {
        this.regionsService = regionsService;
    }
    AuthoritativeRegionComponent.prototype.ngOnInit = function () {
    };
    return AuthoritativeRegionComponent;
}());
AuthoritativeRegionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-authoritative-region',
                template: "<h2>Authoritative Region</h2>\n<div *ngIf=\"regionsService.authoritative | async; else noRegion;\n    let region\" class=\"output-section\">\n  <dl>\n    <app-list-item TITLE=\"Name\" DATA=\"{{ region?.properties.name }}\">\n    </app-list-item>\n    <app-list-item TITLE=\"Network\" DATA=\"{{ region?.properties.network }}\">\n    </app-list-item>\n    <app-list-item TITLE=\"Type\" DATA=\"{{ region?.properties.type }}\">\n    </app-list-item>\n  </dl>\n</div>\n<ng-template #noRegion>\n  <app-no-data></app-no-data>\n</ng-template>",
                styles: [""]
            },] },
];
AuthoritativeRegionComponent.ctorParameters = function () { return [
    { type: RegionsService, },
]; };
var LocationDialogComponent = (function () {
    function LocationDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    LocationDialogComponent.prototype.ngOnInit = function () {
    };
    return LocationDialogComponent;
}());
LocationDialogComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-location-dialog',
                template: "\n<h1 mat-dialog-title>Choose a Location</h1>\n<p>\n  Use one of the methods below to add a location to the map.\n</p>\n<mat-dialog-content>\n  <mat-accordion class=\"location-controls\">\n    <!-- Geolocate control panel -->\n    <mat-expansion-panel>\n      <mat-expansion-panel-header>\n        <mat-panel-title>\n          <mat-icon class=\"header-icon\">my_location</mat-icon>\n          Find Current Location\n        </mat-panel-title>\n      </mat-expansion-panel-header>\n      <app-geolocate-input></app-geolocate-input>\n    </mat-expansion-panel>\n    <!-- Geocode control panel -->\n    <mat-expansion-panel>\n      <mat-expansion-panel-header>\n        <mat-panel-title>\n          <mat-icon class=\"header-icon\">location_city</mat-icon>\n          Search for an Address\n        </mat-panel-title>\n      </mat-expansion-panel-header>\n      <app-geocode-input></app-geocode-input>\n    </mat-expansion-panel>\n    <!-- Coordinate Control panel -->\n    <mat-expansion-panel>\n      <mat-expansion-panel-header>\n        <mat-panel-title>\n          <mat-icon class=\"header-icon\">language</mat-icon>\n          Enter Coordinates\n        </mat-panel-title>\n      </mat-expansion-panel-header>\n      <app-coordinate-input></app-coordinate-input>\n    </mat-expansion-panel>\n  </mat-accordion>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button\n    mat-raised-button\n    color=\"primary\"\n    (click)=\"dialogRef.close()\"\n  >\n    Close\n  </button>\n</mat-dialog-actions>",
                styles: [".location-controls{display:block;margin:2px 0 3px}.mat-dialog-container{background:#fafafa}.header-icon{color:#666;margin:0 1em 0 0}.location-controls mat-panel-title{-webkit-box-align:center;-ms-flex-align:center;align-items:center}"]
            },] },
];
LocationDialogComponent.ctorParameters = function () { return [
    { type: material.MatDialogRef, },
]; };
var GeoserveOutputComponent = (function () {
    function GeoserveOutputComponent(coordinatesService, dialog) {
        this.coordinatesService = coordinatesService;
        this.dialog = dialog;
    }
    Object.defineProperty(GeoserveOutputComponent.prototype, "coordinates", {
        set: function (coordinates) {
            if (coordinates) {
                this.coordinatesService.setCoordinates(coordinates);
            }
        },
        enumerable: true,
        configurable: true
    });
    GeoserveOutputComponent.prototype.onClick = function () {
        if (this.dialog && LocationDialogComponent) {
            this.dialog.open(LocationDialogComponent);
        }
    };
    return GeoserveOutputComponent;
}());
GeoserveOutputComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-geoserve-output',
                template: "<div *ngIf=\"coordinatesService.coordinates | async; else noCoordinates\">\n  <app-location-output></app-location-output>\n  <app-admin-region></app-admin-region>\n  <app-authoritative-region></app-authoritative-region>\n  <app-nearby-places></app-nearby-places>\n  <app-neic-catalog-region></app-neic-catalog-region>\n  <app-neic-response-region></app-neic-response-region>\n  <app-offshore-region></app-offshore-region>\n  <app-tectonic-summary-region></app-tectonic-summary-region>\n</div>\n<ng-template #noCoordinates>\n  <p class=\"alert info\">\n    To select a location, click the\n    <button mat-raised-button class=\"icon-button\" (click)=\"onClick()\">\n      <i class=\"material-icons\">location_searching</i>\n    </button>on the map.\n  </p>\n</ng-template>",
                styles: [""]
            },] },
];
GeoserveOutputComponent.ctorParameters = function () { return [
    { type: CoordinatesService, },
    { type: material.MatDialog, },
]; };
GeoserveOutputComponent.propDecorators = {
    "coordinates": [{ type: core.Input },],
};
var ListItemComponent = (function () {
    function ListItemComponent() {
    }
    ListItemComponent.prototype.ngOnInit = function () {
    };
    return ListItemComponent;
}());
ListItemComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-list-item',
                template: "<dt class=\"title\">{{ TITLE }}</dt>\n<dd class=\"data\">{{ DATA }}</dd>\n",
                styles: [""]
            },] },
];
ListItemComponent.ctorParameters = function () { return []; };
ListItemComponent.propDecorators = {
    "TITLE": [{ type: core.Input },],
    "DATA": [{ type: core.Input },],
};
var LocationOutputComponent = (function () {
    function LocationOutputComponent(coordinatesService) {
        this.coordinatesService = coordinatesService;
    }
    LocationOutputComponent.prototype.ngOnInit = function () {
    };
    return LocationOutputComponent;
}());
LocationOutputComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-location-output',
                template: "<div *ngIf=\"coordinatesService.coordinates | async; let coordinates\" class=\"location-output\">\n  <h2>Location</h2>\n  <p class=\"coordinates alert success\">\n    (\n      {{ coordinates?.latitude }},\n      {{ coordinates?.longitude }}\n    )\n  </p>\n</div>\n",
                styles: [""]
            },] },
];
LocationOutputComponent.ctorParameters = function () { return [
    { type: CoordinatesService, },
]; };
var NearbyPlaceComponent = (function () {
    function NearbyPlaceComponent() {
    }
    NearbyPlaceComponent.prototype.ngOnInit = function () {
    };
    NearbyPlaceComponent.prototype.getName = function (place) {
        return (place.properties.name + ', '
            + place.properties.admin1_name + ', '
            + place.properties.country_name);
    };
    NearbyPlaceComponent.prototype.getDistance = function (place) {
        var distanceKm = place.properties.distance;
        return (this.round(distanceKm, 1) + 'km '
            + '(' + this.round(this.kmToMi(distanceKm), 1) + 'mi) '
            + this.compassWinds(place.properties.azimuth));
    };
    NearbyPlaceComponent.prototype.getPopulation = function (place) {
        return 'Population: ' + place.properties.population;
    };
    NearbyPlaceComponent.prototype.compassWinds = function (azimuth) {
        var fullwind = 22.5;
        var directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
            'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
        if (directions.indexOf(azimuth) > -1) {
            return azimuth;
        }
        return directions[(Math.round((azimuth % 360) / fullwind))];
    };
    NearbyPlaceComponent.prototype.kmToMi = function (km) {
        return km * 0.621371;
    };
    NearbyPlaceComponent.prototype.round = function (raw, decimals) {
        var factor = Math.pow(10, decimals);
        return Math.round(raw * factor) / factor;
    };
    return NearbyPlaceComponent;
}());
NearbyPlaceComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-nearby-place',
                template: "<span class=\"name\">{{ getName(place) }}</span>\n<aside class=\"distance\">{{ getDistance(place) }}</aside>\n<aside class=\"population\">{{ getPopulation(place) }}</aside>\n",
                styles: [".name{display:block}.distance,.population{color:#666;display:block;float:left;font-size:smaller}.population{float:right}"]
            },] },
];
NearbyPlaceComponent.ctorParameters = function () { return []; };
NearbyPlaceComponent.propDecorators = {
    "place": [{ type: core.Input },],
};
var PlacesService = (function () {
    function PlacesService(coordinatesService, http$$1) {
        var _this = this;
        this.coordinatesService = coordinatesService;
        this.http = http$$1;
        this.PLACES_URL = environment.apiUrl + 'places.json';
        this._places = new BehaviorSubject.BehaviorSubject(null);
        this.places = this._places.asObservable();
        this.coordinatesService.coordinates.subscribe(function (coordinates) {
            _this.getPlaces(coordinates.latitude, coordinates.longitude);
        });
    }
    PlacesService.prototype.empty = function () {
        this._places.next(null);
    };
    PlacesService.prototype.getPlaces = function (latitude, longitude) {
        var _this = this;
        var url = this.buildUrl(latitude, longitude);
        this.http.get(url).pipe(operators.catchError(this.handleError('getPlaces', { event: { features: [] } }))).subscribe(function (response) {
            _this._places.next(response.event.features);
        });
    };
    PlacesService.prototype.handleError = function (action, result) {
        return function (error) {
            console.error(error);
            return of.of((result));
        };
    };
    PlacesService.prototype.buildUrl = function (latitude, longitude) {
        while (longitude <= -180) {
            longitude += 360;
        }
        while (longitude > 180) {
            longitude -= 360;
        }
        return this.PLACES_URL + '?' +
            ("latitude=" + latitude) +
            ("&longitude=" + longitude) +
            '&type=event';
    };
    return PlacesService;
}());
PlacesService.decorators = [
    { type: core.Injectable },
];
PlacesService.ctorParameters = function () { return [
    { type: CoordinatesService, },
    { type: http.HttpClient, },
]; };
var NearbyPlacesComponent = (function () {
    function NearbyPlacesComponent(placesService) {
        this.placesService = placesService;
    }
    NearbyPlacesComponent.prototype.ngOnInit = function () {
    };
    return NearbyPlacesComponent;
}());
NearbyPlacesComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-nearby-places',
                template: "<h2>Nearby Places</h2>\n<div *ngIf=\"placesService.places | async; else noNearbyPlaces\">\n  <ol>\n    <li *ngFor=\"let place of placesService.places | async\">\n      <app-nearby-place [place]=\"place\"></app-nearby-place>\n    </li>\n  </ol>\n</div>\n<ng-template #noNearbyPlaces>\n  <app-no-data></app-no-data>\n</ng-template>\n",
                styles: ["ol{list-style:none;padding:0}li{clear:both;margin-bottom:.5em;overflow:hidden}"]
            },] },
];
NearbyPlacesComponent.ctorParameters = function () { return [
    { type: PlacesService, },
]; };
var NeicCatalogRegionComponent = (function () {
    function NeicCatalogRegionComponent(regionsService) {
        this.regionsService = regionsService;
    }
    NeicCatalogRegionComponent.prototype.ngOnInit = function () {
    };
    return NeicCatalogRegionComponent;
}());
NeicCatalogRegionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-neic-catalog-region',
                template: "<!-- NEIC Catalog region was returned, display the region -->\n<h2>NEIC Catalog Region</h2>\n<div *ngIf=\"regionsService.neicCatalog | async; else noRegion;\n    let region \"class=\"output-section\">\n  <dl class=\"neic-catalog-region\">\n    <app-list-item TITLE=\"Name\" DATA=\"{{ region?.properties.name }}\">\n    </app-list-item>\n    <app-list-item TITLE=\"Type\" DATA=\"{{ region?.properties.type }}\">\n    </app-list-item>\n    <app-list-item TITLE=\"Magnitude\" DATA=\"{{ region?.properties.magnitude }}\">\n    </app-list-item>\n  </dl>\n</div>\n<!-- No NEIC Catalog region was returned -->\n<ng-template #noRegion>\n  <app-no-data></app-no-data>\n</ng-template>\n",
                styles: [""]
            },] },
];
NeicCatalogRegionComponent.ctorParameters = function () { return [
    { type: RegionsService, },
]; };
var NeicResponseRegionComponent = (function () {
    function NeicResponseRegionComponent(regionsService) {
        this.regionsService = regionsService;
    }
    NeicResponseRegionComponent.prototype.ngOnInit = function () {
    };
    return NeicResponseRegionComponent;
}());
NeicResponseRegionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-neic-response-region',
                template: "<!-- NEIC Response region was returned, display the region -->\n<h2>NEIC Response Region</h2>\n<div *ngIf=\"regionsService.neicResponse | async; else noRegion;\n    let region\" class=\"output-section\">\n  <dl class=\"neic-response-region\">\n    <app-list-item TITLE=\"Name\" DATA=\"{{ region?.properties.name }}\">\n    </app-list-item>\n    <app-list-item TITLE=\"Magnitude\" DATA=\"{{ region?.properties.magnitude }}\">\n    </app-list-item>\n    <app-list-item TITLE=\"Type\" DATA=\"{{ region?.properties.type }}\">\n    </app-list-item>\n  </dl>\n</div>\n<!-- No administrative region was returned -->\n<ng-template #noRegion>\n  <app-no-data></app-no-data>\n</ng-template>\n",
                styles: [""]
            },] },
];
NeicResponseRegionComponent.ctorParameters = function () { return [
    { type: RegionsService, },
]; };
var NoDataComponent = (function () {
    function NoDataComponent() {
    }
    NoDataComponent.prototype.ngOnInit = function () {
    };
    return NoDataComponent;
}());
NoDataComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-no-data',
                template: "<div  class=\"no-data\">\n  <p>\n    Data not available.\n  </p>\n</div>",
                styles: [""]
            },] },
];
NoDataComponent.ctorParameters = function () { return []; };
var OffshoreRegionComponent = (function () {
    function OffshoreRegionComponent(regionsService) {
        this.regionsService = regionsService;
    }
    OffshoreRegionComponent.prototype.ngOnInit = function () {
    };
    return OffshoreRegionComponent;
}());
OffshoreRegionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-offshore-region',
                template: "<!-- Offshore region was returned, display the region -->\n<h2>Offshore Region</h2>\n<div *ngIf=\"regionsService.offshoreRegions | async; else noOffshoreRegion;\n    let offshoreRegions\" class=\"output-section\">\n  <dl class=\"offshore-region\">\n    <app-list-item TITLE=\"Name\" DATA=\"{{ offshoreRegions?.properties.name }}\">\n    </app-list-item>\n  </dl>\n</div>\n<!-- No offshore region was returned -->\n<ng-template #noOffshoreRegion>\n  <app-no-data></app-no-data>\n</ng-template>\n",
                styles: [""]
            },] },
];
OffshoreRegionComponent.ctorParameters = function () { return [
    { type: RegionsService, },
]; };
var TectonicSummaryRegionComponent = (function () {
    function TectonicSummaryRegionComponent(regionsService) {
        this.regionsService = regionsService;
    }
    TectonicSummaryRegionComponent.prototype.ngOnInit = function () {
    };
    return TectonicSummaryRegionComponent;
}());
TectonicSummaryRegionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'app-tectonic-summary-region',
                template: "<h2>Tectonic Summary</h2>\n<div *ngIf=\"regionsService.tectonic | async; else noTectonic; let tectonic\"\n    class=\"tectonic-output\">\n  <div [innerHTML]=\"tectonic?.properties.summary\">\n  </div>\n</div>\n<ng-template #noTectonic>\n  <app-no-data></app-no-data>\n</ng-template>",
                styles: [""]
            },] },
];
TectonicSummaryRegionComponent.ctorParameters = function () { return [
    { type: RegionsService, },
]; };
var GeoserveOutputModule = (function () {
    function GeoserveOutputModule() {
    }
    return GeoserveOutputModule;
}());
GeoserveOutputModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
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
GeoserveOutputModule.ctorParameters = function () { return []; };

exports.GeoserveOutputModule = GeoserveOutputModule;
exports.ɵc = CoordinatesService;
exports.ɵa = AdminRegionComponent;
exports.ɵd = AuthoritativeRegionComponent;
exports.ɵe = GeoserveOutputComponent;
exports.ɵf = ListItemComponent;
exports.ɵg = LocationOutputComponent;
exports.ɵh = NearbyPlaceComponent;
exports.ɵi = NearbyPlacesComponent;
exports.ɵk = NeicCatalogRegionComponent;
exports.ɵl = NeicResponseRegionComponent;
exports.ɵm = NoDataComponent;
exports.ɵn = OffshoreRegionComponent;
exports.ɵo = TectonicSummaryRegionComponent;
exports.ɵj = PlacesService;
exports.ɵb = RegionsService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=earthquake-geoserve-ui.umd.js.map
