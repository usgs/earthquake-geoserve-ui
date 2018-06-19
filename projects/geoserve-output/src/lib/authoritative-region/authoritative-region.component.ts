import { Component, OnInit } from '@angular/core';

import { RegionsService } from 'location-input';

@Component({
  selector: 'app-authoritative-region',
  templateUrl: './authoritative-region.component.html',
  styleUrls: ['./authoritative-region.component.css']
})
export class AuthoritativeRegionComponent implements OnInit {

  constructor(public readonly regionsService: RegionsService) { }

  ngOnInit() {
  }

}
