import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatesService } from './coordinates.service';
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
        PlacesService,
        RegionsService
      ]
    };
  }
}