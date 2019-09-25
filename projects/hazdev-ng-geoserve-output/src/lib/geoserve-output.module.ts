import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

import { AdminRegionComponent } from './admin-region/admin-region.component';
import { AuthoritativeRegionComponent } from './authoritative-region/authoritative-region.component';
import { DistanceAzimuthPipe } from './distance-azimuth.pipe';
import { GeoserveOutputComponent } from './geoserve-output.component';
import { ListItemComponent } from './list-item/list-item.component';
import { LocationOutputComponent } from './location-output/location-output.component';
import { NearbyPlaceComponent } from './nearby-place/nearby-place.component';
import { NearbyPlaceListComponent } from './nearby-place-list/nearby-place-list.component';
import { NearbyPlacesComponent } from './nearby-places/nearby-places.component';
import { NeicCatalogRegionComponent } from './neic-catalog-region/neic-catalog-region.component';
import { NeicResponseRegionComponent } from './neic-response-region/neic-response-region.component';
import { NoDataComponent } from './no-data/no-data.component';
import { OffshoreRegionComponent } from './offshore-region/offshore-region.component';
import { OverlaysService } from './overlays.service';
import { PlaceNamePipe } from './place-name.pipe';
import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';
import { TectonicSummaryRegionComponent } from './tectonic-summary-region/tectonic-summary-region.component';

@NgModule({
  declarations: [
    AdminRegionComponent,
    AuthoritativeRegionComponent,
    DistanceAzimuthPipe,
    GeoserveOutputComponent,
    ListItemComponent,
    LocationOutputComponent,
    NearbyPlaceComponent,
    NearbyPlaceListComponent,
    NearbyPlacesComponent,
    NeicCatalogRegionComponent,
    NeicResponseRegionComponent,
    NoDataComponent,
    OffshoreRegionComponent,
    PlaceNamePipe,
    TectonicSummaryRegionComponent
  ],
  exports: [
    AdminRegionComponent,
    AuthoritativeRegionComponent,
    DistanceAzimuthPipe,
    GeoserveOutputComponent,
    ListItemComponent,
    LocationOutputComponent,
    NearbyPlaceComponent,
    NearbyPlaceListComponent,
    NearbyPlacesComponent,
    NeicCatalogRegionComponent,
    NeicResponseRegionComponent,
    NoDataComponent,
    OffshoreRegionComponent,
    PlaceNamePipe,
    TectonicSummaryRegionComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule
  ]
})
export class GeoserveOutputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GeoserveOutputModule,
      providers: [OverlaysService, PlacesService, RegionsService]
    };
  }
}
