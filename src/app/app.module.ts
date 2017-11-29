import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';

import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AppComponent } from './app.component';
import { AuthoritativeRegionComponent } from './authoritative-region/authoritative-region.component';
import { HazdevTemplateComponent } from './hazdev-template/hazdev-template.component';
import { HazdevTemplateContentComponent } from './hazdev-template-content/hazdev-template-content.component';
import { HazdevTemplateFooterComponent } from './hazdev-template-footer/hazdev-template-footer.component';
import { HazdevTemplateHeaderComponent } from './hazdev-template-header/hazdev-template-header.component';
import { HazdevTemplateNavigationComponent } from './hazdev-template-navigation/hazdev-template-navigation.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationOutputComponent } from './location-output/location-output.component';
import { NearbyPlacesComponent } from './nearby-places/nearby-places.component';
import { NeicCatalogRegionComponent } from './neic-catalog-region/neic-catalog-region.component';
import { NeicResponseRegionComponent } from './neic-response-region/neic-response-region.component';
import { OffshoreRegionComponent } from './offshore-region/offshore-region.component';
import { TectonicSummaryRegionComponent } from './tectonic-summary-region/tectonic-summary-region.component';
import { TimezoneRegionComponent } from './timezone-region/timezone-region.component';


@NgModule({
  declarations: [
    AdminRegionComponent,
    AppComponent,
    AuthoritativeRegionComponent,
    HazdevTemplateComponent,
    HazdevTemplateContentComponent,
    HazdevTemplateFooterComponent,
    HazdevTemplateHeaderComponent,
    HazdevTemplateNavigationComponent,
    LocationMapComponent,
    LocationOutputComponent,
    NearbyPlacesComponent,
    NeicCatalogRegionComponent,
    NeicResponseRegionComponent,
    OffshoreRegionComponent,
    TectonicSummaryRegionComponent,
    TimezoneRegionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PlacesService,
    RegionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
