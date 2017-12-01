import { Component, Input, OnInit } from '@angular/core';

import { Region } from '../region';

@Component({
  selector: 'app-admin-region',
  templateUrl: './admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent implements OnInit {
  // Expect an array, but we only care about the first row
  @Input() region: Region;

  constructor() { }

  ngOnInit() {
  }

}
