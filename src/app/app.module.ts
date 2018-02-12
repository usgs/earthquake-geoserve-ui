import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoordinatesService } from './coordinates.service';
import { GeocodeService } from './geocode.service';
import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';

import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AppComponent } from './app.component';
import { AuthoritativeRegionComponent } from './authoritative-region/authoritative-region.component';
import { CoordinateInputComponent } from './coordinate-input/coordinate-input.component';
import { GeoserveComponent } from './geoserve/geoserve.component';
import { ListItemComponent } from './list-item/list-item.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationOutputComponent } from './location-output/location-output.component';
import { NearbyPlaceComponent } from './nearby-place/nearby-place.component';
import { NearbyPlacesComponent } from './nearby-places/nearby-places.component';
import { NeicCatalogRegionComponent } from './neic-catalog-region/neic-catalog-region.component';
import { NeicResponseRegionComponent } from './neic-response-region/neic-response-region.component';
import { NoDataComponent } from './no-data/no-data.component';
import { OffshoreRegionComponent } from './offshore-region/offshore-region.component';
import { TectonicSummaryRegionComponent } from './tectonic-summary-region/tectonic-summary-region.component';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { GeolocateInputComponent } from './geolocate-input/geolocate-input.component';
import { GeocodeInputComponent } from './geocode-input/geocode-input.component';
import { OverlaysService } from './overlays.service';

import { HazdevTemplateModule } from './hazdev-template/hazdev-template.module';


@NgModule({
  declarations: [
    AdminRegionComponent,
    AppComponent,
    AuthoritativeRegionComponent,
    CoordinateInputComponent,
    GeoserveComponent,
    ListItemComponent,
    LocationMapComponent,
    LocationOutputComponent,
    NearbyPlaceComponent,
    NearbyPlacesComponent,
    NeicCatalogRegionComponent,
    NeicResponseRegionComponent,
    NoDataComponent,
    OffshoreRegionComponent,
    TectonicSummaryRegionComponent,
    LocationDialogComponent,
    GeolocateInputComponent,
    GeocodeInputComponent
  ],
  entryComponents: [
    CoordinateInputComponent,
    GeoserveComponent,
    LocationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HazdevTemplateModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule
  ],
  providers: [
    CoordinatesService,
    GeocodeService,
    PlacesService,
    RegionsService,
    MediaMatcher,
    OverlaysService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
