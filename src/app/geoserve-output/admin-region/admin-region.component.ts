import { Component, OnInit } from '@angular/core';

import { Region } from '../../core/region';
import { RegionsService } from '../../core/regions.service';

@Component({
  selector: 'app-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent implements OnInit {

  constructor (public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }
}
