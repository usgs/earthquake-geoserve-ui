import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { GeocodeService } from '../core/geocode.service';
import { CoordinatesService } from '../core/coordinates.service';

@Component({
  selector: 'app-geocode-input',
  templateUrl: './geocode-input.component.html',
  styleUrls: ['./geocode-input.component.css']
})
export class GeocodeInputComponent implements OnInit, OnDestroy {
  addressForm: FormGroup;
  showProgressBar: boolean;
  service: any;

  constructor(
    private coordinatesService: CoordinatesService,
    private geocodeService: GeocodeService,
    private dialogRef: MatDialogRef<GeocodeInputComponent>,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.showProgressBar = false;

    // subscribe to geocode changes
    this.service = this.geocodeService.location.subscribe((location) => {
      if (location) {
        this.setCoordinates(location);
        this.geocodeService.empty();
      } else {
        this.showProgressBar = false;
      }
    });

    this.addressForm = this.fb.group({
      'address': ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }

  doGeocode (value: any): void {
    const address = value.address;

    if (this.addressForm.invalid) {
      return;
    }

    // get lat/lng from geocode service
    this.geocodeService.getLocation(address);

    // show progress barr
    this.showProgressBar = true;
  }

  setCoordinates (location: any): void {
    let confidence,
        latitude,
        longitude,
        zoom;

    // compute confidence
    confidence = this.coordinatesService.computeFromGeocode(location);

    // compute zoom
    zoom = this.coordinatesService.computeZoomFromConfidence(confidence);

    // round latitude and longitude values based on confidence
    latitude = this.coordinatesService.roundLocation(+location.feature.geometry.y, confidence);
    longitude = this.coordinatesService.roundLocation(+location.feature.geometry.x, confidence);


    // set coordinates
    this.coordinatesService.setCoordinates({
      confidence: confidence,
      latitude: latitude,
      longitude: longitude,
      method: 'geocode',
      zoom: zoom,
      name: location.name
    });

    // close dialog and stop progress spinner
    this.showProgressBar = false;
    this.dialogRef.close();
  }
}
