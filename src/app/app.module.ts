import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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

import { GeoserveOutputModule } from 'geoserve-output';
import { LocationInputModule } from 'hazdev-ng-location-input';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { GeoserveComponent } from './geoserve/geoserve.component';
import { HazdevTemplateComponent } from './hazdev-template/hazdev-template.component';
import { HazdevTemplateFooterComponent } from './hazdev-template-footer/hazdev-template-footer.component';
import { HazdevTemplateHeaderComponent } from './hazdev-template-header/hazdev-template-header.component';
import { HazdevTemplateNavigationComponent } from './hazdev-template-navigation/hazdev-template-navigation.component';
import { HazdevTemplatePageComponent } from './hazdev-template-page/hazdev-template-page.component';


@NgModule({
  declarations: [
    AppComponent,
    GeoserveComponent,
    HazdevTemplateComponent,
    HazdevTemplateFooterComponent,
    HazdevTemplateHeaderComponent,
    HazdevTemplateNavigationComponent,
    HazdevTemplatePageComponent
  ],
  entryComponents: [
    GeoserveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    FormsModule,
    GeoserveOutputModule.forRoot(),
    HttpClientModule,
    LocationInputModule.forRoot(),
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
  exports: [
  ],
  providers: [
    MediaMatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
