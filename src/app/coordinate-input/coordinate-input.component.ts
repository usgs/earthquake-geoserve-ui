import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { CoordinatesService } from '../coordinates.service';

@Component({
  selector: 'app-coordinate-input',
  templateUrl: './coordinate-input.component.html',
  styleUrls: ['./coordinate-input.component.css']
})
export class CoordinateInputComponent implements OnDestroy, OnInit {
  coordinatesForm: FormGroup;
  coordinatesObservable;

  constructor (
    public coordinatesService: CoordinatesService,
    public dialogRef: MatDialogRef<CoordinateInputComponent>,
    public fb: FormBuilder
  ) {}

  ngOnInit () {
    let latitude,
        longitude;

    this.coordinatesObservable =
      this.coordinatesService.coordinates.subscribe((coordinates) => {
        latitude = (coordinates ? coordinates.latitude : '');
        longitude = (coordinates ? coordinates.longitude : '');
      });

    this.coordinatesForm = this.fb.group({
      'latitude': [latitude, Validators.required],
      'longitude': [longitude, Validators.required]
    });
  }

  ngOnDestroy () {
    this.coordinatesObservable.unsubscribe();
  }

  handleSubmit (value: any) {
    let confidence,
        latitude,
        longitude,
        zoom;

    latitude = value.latitude;
    longitude = value.longitude;

    if (this.coordinatesForm.invalid) {
      return;
    }

    // compute confidence
    confidence = this.coordinatesService.computeFromCoordinates(
        latitude, longitude);

    // compute zoom
    zoom = this.coordinatesService.computeZoomFromConfidence(confidence);

    // set location
    this.coordinatesService.setCoordinates({
      confidence: confidence,
      latitude: +latitude,
      longitude: +longitude,
      method: 'coordinate',
      zoom: zoom
    });

    // Use injected reference to close dialog
    this.dialogRef.close();
  }
}
