import { Component } from '@angular/core';

import { PlacesService } from '../places.service';

@Component({
  selector: 'geoserve-nearby-places',
  styleUrls: ['./nearby-places.component.css'],
  templateUrl: './nearby-places.component.html'
})
export class NearbyPlacesComponent {
  constructor(readonly placesService: PlacesService) {}
}
