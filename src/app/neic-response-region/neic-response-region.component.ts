import { Component, OnInit } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'app-neic-response-region',
  templateUrl: './neic-response-region.component.html',
  styleUrls: ['./neic-response-region.component.css']
})
export class NeicResponseRegionComponent implements OnInit {

  constructor(private regionsService: RegionsService) { }

  ngOnInit() {
  }

}
