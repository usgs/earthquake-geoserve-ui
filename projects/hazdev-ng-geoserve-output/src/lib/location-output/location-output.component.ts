import { Component } from '@angular/core';
import { CoordinatesService } from 'hazdev-ng-location-view';

@Component({
  selector: 'geoserve-location-output',
  styleUrls: ['./location-output.component.css'],
  templateUrl: './location-output.component.html'
})
export class LocationOutputComponent {
  constructor(public coordinatesService: CoordinatesService) {}
}
