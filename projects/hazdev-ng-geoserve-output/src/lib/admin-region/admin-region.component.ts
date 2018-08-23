import { Component, OnInit } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent implements OnInit {

  constructor (public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }
}
