import { Component, OnInit} from '@angular/core';

import { RegionsService } from '../regions.service';


import { PlacesService } from '../places.service';


@Component({
  selector: 'app-coordinate-input',
  templateUrl: './coordinate-input.component.html',
  styleUrls: ['./coordinate-input.component.css']
})
export class CoordinateInputComponent implements OnInit {
  constructor (private placesService: PlacesService) { }
  constructor(private regionsService: RegionsService) { }

  ngOnInit () {
  }

  handleClick (latitude: string, longitude: string) {
    this.placesService.getPlaces(latitude, longitude);
    this.regionsService.getRegions(latitude,longitude);

  }

}
