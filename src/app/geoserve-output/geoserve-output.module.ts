import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AuthoritativeRegionComponent } from './authoritative-region/authoritative-region.component';
import { GeoserveOutputComponent } from './geoserve-output.component';
import { ListItemComponent } from './list-item/list-item.component';
import { LocationOutputComponent } from './location-output/location-output.component';
import { NearbyPlaceComponent } from './nearby-place/nearby-place.component';
import { NearbyPlacesComponent } from './nearby-places/nearby-places.component';
import { NeicCatalogRegionComponent } from './neic-catalog-region/neic-catalog-region.component';
import { NeicResponseRegionComponent } from './neic-response-region/neic-response-region.component';
import { NoDataComponent } from './no-data/no-data.component';
import { OffshoreRegionComponent } from './offshore-region/offshore-region.component';
import { TectonicSummaryRegionComponent } from './tectonic-summary-region/tectonic-summary-region.component';

import { LocationInputModule } from 'location-input';

@NgModule({
  imports: [
    CommonModule,
    LocationInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [
    AdminRegionComponent,
    AuthoritativeRegionComponent,
    GeoserveOutputComponent,
    ListItemComponent,
    LocationOutputComponent,
    NearbyPlaceComponent,
    NearbyPlacesComponent,
    NeicCatalogRegionComponent,
    NeicResponseRegionComponent,
    NoDataComponent,
    OffshoreRegionComponent,
    TectonicSummaryRegionComponent
  ],
  exports: [
    AdminRegionComponent,
    AuthoritativeRegionComponent,
    GeoserveOutputComponent,
    ListItemComponent,
    LocationOutputComponent,
    NearbyPlaceComponent,
    NearbyPlacesComponent,
    NeicCatalogRegionComponent,
    NeicResponseRegionComponent,
    NoDataComponent,
    OffshoreRegionComponent,
    TectonicSummaryRegionComponent
  ]
})
export class GeoserveOutputModule { }
