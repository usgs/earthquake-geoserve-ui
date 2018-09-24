import { Component } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-offshore-region',
  styleUrls: ['./offshore-region.component.css'],
  templateUrl: './offshore-region.component.html'
})
export class OffshoreRegionComponent {
  constructor(readonly regionsService: RegionsService) {}
}
