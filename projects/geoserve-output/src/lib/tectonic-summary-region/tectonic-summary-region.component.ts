import { Component, OnInit } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'app-tectonic-summary-region',
  templateUrl: './tectonic-summary-region.component.html',
  styleUrls: ['./tectonic-summary-region.component.css']
})
export class TectonicSummaryRegionComponent implements OnInit {

  constructor(public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }

}
