import { Component, OnInit} from '@angular/core';

import { CoordinatesService } from '../coordinates.service';
import { PlacesService } from '../places.service';
import { RegionsService } from '../regions.service';

@Component({
  selector: 'app-coordinate-input',
  templateUrl: './coordinate-input.component.html',
  styleUrls: ['./coordinate-input.component.css']
})
export class CoordinateInputComponent implements OnInit {
  constructor (
    private coordinatesService: CoordinatesService,
    private placesService: PlacesService,
    private regionsService: RegionsService
  ) { }

  ngOnInit () {
  }

  handleClick (latitude: string, longitude: string) {
    this.coordinatesService.setCoordinates(latitude, longitude, 'coordinate');
    this.placesService.getPlaces(latitude, longitude);
    this.regionsService.getRegions(latitude, longitude);
  }
}
