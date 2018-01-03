import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { icon, latLng, Layer, marker, polyline, tileLayer } from 'leaflet';
import * as L from 'leaflet';

import { CoordinatesService } from '../coordinates.service';
import { Coordinates } from '../coordinates';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';


@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocationMapComponent implements OnInit {
  @Input() leaflet: any;
  @Input() leafletBaseLayers: any;
  @Input() leafletCenter: any;
  @Input() leafletZoom: any;

  // Define our base layers so we can reference them multiple times
  LAYER_STREET =
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, ' +
        'Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, ' +
        'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the ' +
        'GIS User Community'
    });

  LAYER_SATELLITE =
    L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/' +
      'World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, ' +
        'USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the ' +
        'GIS User Community'
    });

  LAYER_TERRAIN =
    L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/' +
      'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, ' +
        'Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, ' +
        'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the ' +
        'GIS User Community'
    });

  // Leaflet options
  baseLayers = {
    'Esri Terrain Map': this.LAYER_TERRAIN,
    'Open Street Map': this.LAYER_STREET,
    'Esri Satellite Map': this.LAYER_SATELLITE
  };
  center = [ 38, -95 ];
  map: L.Map;
  marker = new L.Marker(
    [0,0],
    {
      draggable: true,
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    }
  );
  zoom = 4;

  constructor (
    private coordinatesService: CoordinatesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // subscribe to coordinate changes
    this.coordinatesService.coordinates.subscribe((coordinates) => {
      if (coordinates) {
        this.moveMarker(coordinates);
        this.moveMap(coordinates);
      }
    });
    this.marker.on('dragend', this.onDragEnd, this);
  }

  ngOnDestroy() {
    this.marker.off('dragend', this.onDragEnd, this);
  }

  moveMap (coordinates: Coordinates): void {
    // center the map on the provided coordinates
    this.center = [ coordinates.latitude, coordinates.longitude ];
    // zoom the map to the appropriate level
    this.zoom = coordinates.zoom;
  }

  moveMarker (coordinates: Coordinates): void {
    let latLng,
        marker;

    // Update the position of the marker
    latLng = L.latLng(coordinates.latitude, coordinates.longitude);
    this.marker.setLatLng(latLng);

    // if there is no marker on the map, add marker
    if (!this.map.hasLayer(this.marker)) {
      this.map.addLayer(this.marker);
    }
  }

  /**
   * update location on coordinates service
   */
  onDragEnd () {
    let coordinates;

    coordinates = this.marker.getLatLng();

    this.coordinatesService.setCoordinates({
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      method: 'point',
      zoom: this.map.getZoom()
    });
  };

  onMapReady (map: L.Map) {
    let LocationControl;

    // create custom location control
    LocationControl = L.Control.extend({
        options: {
          position: 'topleft'
        },

        initialize: function (options) {
          this._dialog = options.dialog;
          this._component = options.component;
        },

        onAdd: function (map) {
          let container;

          container = L.DomUtil.create('div', 'leaflet-bar leaflet-control ' +
              'leaflet-location-control');
          container.innerHTML = '<a class="material-icons">location_searching' +
              '</a>';

          // open dialog when custom control is clicked
          container.onclick = (() => {
            if (this._dialog && this._component) {
              this._dialog.open(this._component);
            }
          });

          return container;
        },

        onRemove: function (map) {
          // Nothing to do here
        }
    });

    // store reference to map
    this.map = map;
    this.map.addControl(new LocationControl({
      dialog: this.dialog,
      component: LocationDialogComponent
    }));
  }
}
