import { Component } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-admin-region',
  styleUrls: ['./admin-region.component.css'],
  templateUrl: './admin-region.component.html'
})
export class AdminRegionComponent {
  constructor(readonly regionsService: RegionsService) {}
}
