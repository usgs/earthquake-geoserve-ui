import { Component, OnInit } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-offshore-region',
  templateUrl: './offshore-region.component.html',
  styleUrls: ['./offshore-region.component.css']
})
export class OffshoreRegionComponent implements OnInit {

  constructor (public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }

}
