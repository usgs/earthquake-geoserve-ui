import { Component, OnInit} from '@angular/core';

import { PlacesService } from '../places.service';
import { RegionsService } from '../regions.service';


@Component({
  selector: 'app-coordinate-input',
  templateUrl: './coordinate-input.component.html',
  styleUrls: ['./coordinate-input.component.css']
})
export class CoordinateInputComponent implements OnInit {
  constructor (
    private placesService: PlacesService,
    private regionsService: RegionsService
  ) { }

  ngOnInit () {
  }

  handleClick (latitude: string, longitude: string) {
    this.placesService.getPlaces(latitude, longitude);
    this.regionsService.getRegions(latitude, longitude);
  }
}
