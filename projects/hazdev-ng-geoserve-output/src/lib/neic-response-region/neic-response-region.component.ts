import { Component } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-neic-response-region',
  styleUrls: ['./neic-response-region.component.css'],
  templateUrl: './neic-response-region.component.html'
})
export class NeicResponseRegionComponent {
  constructor(readonly regionsService: RegionsService) {}
}
