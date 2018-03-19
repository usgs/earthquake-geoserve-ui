import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatesService } from './coordinates.service';
import { GeocodeService } from './geocode.service';
import { MenuService } from './menu.service';
import { OverlaysService } from './overlays.service';
import { PlacesService } from './places.service';
import { RegionsService } from './regions.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CoordinatesService,
        GeocodeService,
        MenuService,
        OverlaysService,
        PlacesService,
        RegionsService
      ]
    };
  }
}
