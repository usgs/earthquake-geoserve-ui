import { Component, OnInit } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'geoserve-authoritative-region',
  templateUrl: './authoritative-region.component.html',
  styleUrls: ['./authoritative-region.component.css']
})
export class AuthoritativeRegionComponent implements OnInit {

  constructor(public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }

}
