import { Component, OnInit } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-neic-response-region',
  templateUrl: './neic-response-region.component.html',
  styleUrls: ['./neic-response-region.component.css']
})
export class NeicResponseRegionComponent implements OnInit {

  constructor(public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }

}
