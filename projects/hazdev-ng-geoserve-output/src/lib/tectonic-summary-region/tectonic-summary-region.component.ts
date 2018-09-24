import { Component, ViewEncapsulation } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'geoserve-tectonic-summary-region',
  styleUrls: ['./tectonic-summary-region.component.scss'],
  templateUrl: './tectonic-summary-region.component.html'
})
export class TectonicSummaryRegionComponent {
  constructor(readonly regionsService: RegionsService) {}
}
