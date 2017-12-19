import { Component, Input, OnInit } from '@angular/core';

import { PlacesService } from '../places.service';

@Component({
  selector: 'app-location-output',
  templateUrl: './location-output.component.html',
  styleUrls: ['./location-output.component.css']
})
export class LocationOutputComponent implements OnInit {

  constructor (public readonly placesService: PlacesService) {}

  ngOnInit() {
  }

}
