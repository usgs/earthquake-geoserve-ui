import { Component, OnInit, Input } from '@angular/core';

import { PlacesService } from '../../core/places.service';


@Component({
  selector: 'app-nearby-places',
  templateUrl: './nearby-places.component.html',
  styleUrls: ['./nearby-places.component.css']
})
export class NearbyPlacesComponent implements OnInit {

  constructor (public readonly placesService: PlacesService) { }

  ngOnInit () {
  }

}
