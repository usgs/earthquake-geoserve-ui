import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatListModule, MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoordinatesService } from './coordinates.service';
import { GeocodeService } from './geocode.service';
import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';

import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AppComponent } from './app.component';
import { AuthoritativeRegionComponent } from './authoritative-region/authoritative-region.component';
import { CoordinateInputComponent } from './coordinate-input/coordinate-input.component';
import { GeoserveComponent } from './geoserve/geoserve.component';
import { HazdevTemplateComponent } from './hazdev-template/hazdev-template.component';
import { HazdevTemplateFooterComponent } from './hazdev-template-footer/hazdev-template-footer.component';
import { HazdevTemplateHeaderComponent } from './hazdev-template-header/hazdev-template-header.component';
import { HazdevTemplateNavigationComponent } from './hazdev-template-navigation/hazdev-template-navigation.component';
import { HazdevTemplatePageComponent } from './hazdev-template-page/hazdev-template-page.component';
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



@NgModule({
  declarations: [
    AdminRegionComponent,
    AppComponent,
    AuthoritativeRegionComponent,
    CoordinateInputComponent,
    GeoserveComponent,
    HazdevTemplateComponent,
    HazdevTemplateFooterComponent,
    HazdevTemplateHeaderComponent,
    HazdevTemplateNavigationComponent,
    HazdevTemplatePageComponent,
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
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule
  ],
  providers: [
    CoordinatesService,
    GeocodeService,
    PlacesService,
    RegionsService,
    MediaMatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
