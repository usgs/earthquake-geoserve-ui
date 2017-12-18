import { Component, OnInit } from '@angular/core';

import { Region } from '../region';
import { RegionsService } from '../regions.service';

@Component({
  selector: 'app-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent implements OnInit {


  constructor (private regionsService: RegionsService) { }

  ngOnInit() {
  }
}
