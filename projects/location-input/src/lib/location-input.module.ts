import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';

import { LocationInputComponent } from './location-input.component';

import { CoordinateInputComponent } from './coordinate-input/coordinate-input.component';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { GeolocateInputComponent } from './geolocate-input/geolocate-input.component';
import { GeocodeInputComponent } from './geocode-input/geocode-input.component';

import { CoordinatesService } from './core/coordinates.service';
import { GeocodeService } from './core/geocode.service';
import { OverlaysService } from './core/overlays.service';
import { PlacesService } from './core/places.service';
import { RegionsService } from './core/regions.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule
  ],
  declarations: [
    CoordinateInputComponent,
    GeocodeInputComponent,
    GeolocateInputComponent,
    LocationDialogComponent,
    LocationInputComponent,
    LocationMapComponent
  ],
  exports: [
    CoordinateInputComponent,
    GeocodeInputComponent,
    GeolocateInputComponent,
    LocationDialogComponent,
    LocationInputComponent,
    LocationMapComponent
  ],
  providers: [
  ]
})
export class LocationInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LocationInputModule,
      providers: [
        CoordinatesService,
        GeocodeService,
        OverlaysService,
        PlacesService,
        RegionsService
      ]
    };
  }
}
