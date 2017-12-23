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
  @Input() leafletLayers: any;
  @Input() leafletZoom: any;

  markerIcon = icon({
    iconSize: [ 25, 41 ],
    iconAnchor: [ 13, 41 ],
    iconUrl: 'leaflet/marker-icon.png',
    shadowUrl: 'leaflet/marker-shadow.png'
  });

  // Define our base layers so we can reference them multiple times
  LAYER_STREET = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, ' +
        'Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, ' +
        'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the ' +
        'GIS User Community'
    })
  };

  LAYER_SATELLITE = {
    id: 'esrisatellitemap',
    enabled: false,
    name: 'Esri Satellite Map',
    layer: tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/' +
      'World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, ' +
        'USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the ' +
        'GIS User Community'
    })
  };

  LAYER_TERRAIN = {
    id: 'esriterrainmap',
    enabled: true,
    name: 'Esri Terrain Map',
    layer: tileLayer('https://services.arcgisonline.com/arcgis/rest/services/' +
      'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, ' +
        'Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, ' +
        'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the ' +
        'GIS User Community'
    })
  };

  // Leaflet options
  baseLayers = {
    'Esri Terrain Map': this.LAYER_TERRAIN.layer,
    'Open Street Map': this.LAYER_STREET.layer,
    'Esri Satellite Map': this.LAYER_SATELLITE.layer
  };
  center = [ 38, -95 ];
  markers: Layer[] = [];
  zoom = 4;


  constructor (
    private coordinatesService: CoordinatesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // subscribe to coordinate changes
    this.coordinatesService.coordinates.subscribe((coordinates) => {
      if (coordinates) {
        this.addMarker(coordinates);
        this.moveMap(coordinates);
      }
    });
  }

  // Reset marker when coordinates change
  addMarker (coordinates: Coordinates): void {
    const newMarker = marker(
      [
        coordinates.latitude,
        coordinates.longitude
      ],
      {
        icon: this.markerIcon
      }
    );

    this.markers = [ newMarker ];
  }

  // center the map on the provided coordinates
  moveMap (coordinates: Coordinates): void {
    this.center = [ coordinates.latitude, coordinates.longitude ];
    this.zoom = coordinates.zoom;
  }

  onMapReady(map: L.Map) {
    // create custom location control
    let LocationControl = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function(map) {
          let container;

          container = L.DomUtil.create('div', 'leaflet-bar leaflet-control ' +
              'leaflet-location-control');
          container.innerHTML = '<a class="material-icons">location_searching' +
              '</a>';

          // container.onclick = (() => {
          //   this.openDialog();
          // });

          return container;
        },

        onRemove: function(map) {
            // Nothing to do here
        }
    });

    map.addControl(new LocationControl());
  }

  openDialog() {
    let dialogRef = this.dialog.open(LocationDialogComponent, {
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onMapClick(event) {
    this.openDialog();
    console.log(event.target);
  }

}
