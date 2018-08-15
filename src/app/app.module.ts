import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeoserveOutputModule } from 'geoserve-output';
import { LocationViewModule } from 'hazdev-ng-location-view';
import { HazdevTemplateModule } from 'hazdev-template';

import { AppComponent } from './app.component';
import { GeoserveComponent } from './geoserve/geoserve.component';

@NgModule({
  declarations: [AppComponent, GeoserveComponent],
  entryComponents: [GeoserveComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    GeoserveOutputModule,
    HazdevTemplateModule,
    HttpClientModule,
    LocationViewModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [MediaMatcher],
  bootstrap: [AppComponent]
})
export class AppModule {}
