import { Component, EventEmitter, OnInit, Output } from '@angular/core';


import { PlacesService } from '../places.service';


@Component({
  selector: 'app-coordinate-input',
  templateUrl: './coordinate-input.component.html',
  styleUrls: ['./coordinate-input.component.css']
})
export class CoordinateInputComponent implements OnInit {

  constructor (private placesService: PlacesService) { }

  ngOnInit () {
  }

  handleClick (latitude: string, longitude: string) {
    this.placesService.getPlaces(latitude, longitude);
  }

}
