import { Component } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-neic-catalog-region',
  styleUrls: ['./neic-catalog-region.component.css'],
  templateUrl: './neic-catalog-region.component.html'
})
export class NeicCatalogRegionComponent {
  constructor(readonly regionsService: RegionsService) {}
}
