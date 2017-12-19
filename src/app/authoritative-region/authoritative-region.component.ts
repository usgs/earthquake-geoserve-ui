import { Component, OnInit } from '@angular/core';

import { RegionsService } from '../regions.service';

@Component({
  selector: 'app-authoritative-region',
  templateUrl: './authoritative-region.component.html',
  styleUrls: ['./authoritative-region.component.css']
})
export class AuthoritativeRegionComponent implements OnInit {

  constructor(private regionsService: RegionsService) { }

  ngOnInit() {
  }

}
