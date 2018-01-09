import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { GeocodeService } from '../geocode.service';
import { CoordinatesService } from '../coordinates.service';

@Component({
  selector: 'app-geocode-input',
  templateUrl: './geocode-input.component.html',
  styleUrls: ['./geocode-input.component.css']
})
export class GeocodeInputComponent implements OnInit, OnDestroy {
  showProgressBar: boolean;
  service: any;

  constructor(
    private coordinatesService: CoordinatesService,
    private geocodeService: GeocodeService,
    private dialogRef: MatDialogRef<GeocodeInputComponent>
  ) { }

  ngOnInit() {
    this.showProgressBar = false;

    // subscribe to geocode changes
    this.service = this.geocodeService.location.subscribe((location) => {
      console.log('subscribe');
      console.log('location', location);
      if (location) {
        this.setLocation(location);
        this.geocodeService.empty();
      } else {
        console.log('subscribe, else');
        this.showProgressBar = false;
      }
    });
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }

  private setLocation (location: any): void {
    let confidence,
        zoom;

    // compute confidence
    confidence = this.coordinatesService.computeFromGeocode(location);

    // compute zoom
    zoom = this.coordinatesService.computeZoomFromConfidence(confidence);

    // set coordinates
    this.coordinatesService.setCoordinates({
      confidence: confidence,
      latitude: +location.feature.geometry.y,
      longitude: +location.feature.geometry.x,
      method: 'geocode',
      zoom: zoom,
      name: location.name
    });

    // close dialog and stop progress spinner
    this.showProgressBar = false;
    this.dialogRef.close();
  }

  private doGeocode (address: string): void {
    // get lat/lng from geocode service
    this.geocodeService.getLocation(address);

    // show progress barr
    this.showProgressBar = true;
  }
}
