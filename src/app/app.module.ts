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
  MatSidenavModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeoserveOutputModule } from 'hazdev-ng-geoserve-output';
import { HazdevTemplateModule } from 'hazdev-ng-template';
import { LocationViewModule } from 'hazdev-ng-location-view';

import { AppComponent } from './app.component';
import { GeoserveComponent } from './geoserve/geoserve.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, GeoserveComponent],
  exports: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    GeoserveOutputModule.forRoot(),
    HazdevTemplateModule,
    HttpClientModule,
    LocationViewModule.forRoot(),
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
  providers: []
})
export class AppModule {}
