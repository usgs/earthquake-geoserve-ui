import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

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
export class LocationMapComponent implements OnDestroy, OnInit {
  map: L.Map;
  marker: L.Marker;

  constructor(
    private coordinatesService: CoordinatesService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.marker.off('dragend', this.onDragEnd, this);
  }

  ngOnInit() {
    let baseMaps,
        LocationControl,
        satellite,
        street,
        terrain;

    // Create map (center on US)
    this.map = L.map('map', {
      center: [ 38, -95 ],
      zoom: 4
    });

    // Street Map
    street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, ' +
        'Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, ' +
        'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the ' +
        'GIS User Community'
    });

    // Satellite Map
    satellite = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/' +
      'World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, ' +
        'USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the ' +
        'GIS User Community'
    });

    // Terrain Map
    terrain = L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/' +
      'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, ' +
        'Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, ' +
        'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the ' +
        'GIS User Community'
    }).addTo(this.map);

    // Group baselayers
    baseMaps = {
      'Satellite': satellite,
      'Street': street,
      'Terrain': terrain
    };

    // Add layers to map
    L.control.layers(baseMaps).addTo(this.map);

    // Create location marker
    this.marker = new L.Marker(
      [ 0, 0 ],
      {
        draggable: true,
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      }
    );

    // bind to dragend on map marker
    this.marker.on('dragend', this.onDragEnd, this);

    // Create location control to open dialog
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

    // Add Location Control to map
    this.map.addControl(new LocationControl({
      dialog: this.dialog,
      component: LocationDialogComponent
    }));

    // subscribe to location changes
    this.coordinatesService.coordinates.subscribe((coordinates) => {
      if (coordinates) {
        this.moveMarker(coordinates);
        this.moveMap(coordinates);
      }
    });
  }

  moveMap (coordinates: Coordinates): void {
    // pan/zoom the provided location
    this.map.setView(
        new L.LatLng(coordinates.latitude, coordinates.longitude ),
        coordinates.zoom
      );
  }

  moveMarker (coordinates: Coordinates): void {
    let latLng;

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
    let confidence,
        coordinates,
        zoom;

    // grab coordinates off map marker
    coordinates = this.marker.getLatLng();

    // get zoom level from map
    zoom = this.map.getZoom();

    // get confidence from zoom
    confidence = this.coordinatesService.computeFromPoint(zoom);


    this.coordinatesService.setCoordinates({
      confidence: confidence,
      latitude: +coordinates.lat,
      longitude: +coordinates.lng,
      method: 'point',
      zoom: zoom
    });
  }


}
