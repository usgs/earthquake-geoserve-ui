import { Component } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-authoritative-region',
  styleUrls: ['./authoritative-region.component.css'],
  templateUrl: './authoritative-region.component.html'
})
export class AuthoritativeRegionComponent {
  constructor(readonly regionsService: RegionsService) {}
}
