import { Component, OnInit } from '@angular/core';

import { Region } from '../region';
import { RegionsService } from '../regions.service';

@Component({
  selector: 'app-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent implements OnInit {
  private region: Region;

  constructor(
    private regionsService: RegionsService
  ) { }

  ngOnInit() {
    this.regionsService.currentRegions.subscribe((result) => {
      if (result.admin) {
        this.region = result.admin.features;
      }
    });
  }

}
