import { Component, OnInit } from '@angular/core';

import { icon, latLng, Layer, marker, polyline, tileLayer } from 'leaflet';

import { PlacesService } from '../places.service';
import { Util } from '../util/app.utility.service';


@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit {

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


  baseLayers = {
    'Esri Terrain Map': this.LAYER_TERRAIN.layer,
    'Open Street Map': this.LAYER_STREET.layer,
    'Esri Satellite Map': this.LAYER_SATELLITE.layer
  };

  markers: Layer[] = [];
  center = [ 38, -95 ];
  zoom = 4;

  options = {
    zoom: this.zoom,
    center: this.center
  };


  constructor (
    private placesService: PlacesService,
    private util: Util
  ) {}

  ngOnInit() {
    // subscribe to coordinate changes
    this.placesService.coordinates.subscribe((data) => {
      console.log(data);
      if (data) {
        this.addMarker(+data.latitude, +data.longitude);
        this.moveMap(data.latitude, data.longitude);
      }
    });
  }

  // Reset marker when coordinates change
  addMarker (latitude: number, longitude: number) :void {
    const newMarker = marker(
      [ latitude, longitude ],
      {
        icon: this.markerIcon
      }
    );

    this.markers = [ newMarker ];
  }

  // center the map on the provided coordinates
  moveMap (latitude: string, longitude: string) {
    this.center = [ +latitude, +longitude ];
    this.zoom = this.util.computeZoomFromConfidence(
        this.util.computeFromCoordinates(latitude, longitude)
      );

    console.log('zoom: ' + this.zoom);
  }

}
