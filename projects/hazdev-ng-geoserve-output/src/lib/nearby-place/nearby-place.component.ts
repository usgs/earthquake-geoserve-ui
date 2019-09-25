import { Component, Input, OnChanges } from '@angular/core';
import { Place } from '../place';

@Component({
  selector: 'geoserve-nearby-place',
  styleUrls: ['./nearby-place.component.css'],
  templateUrl: './nearby-place.component.html'
})
export class NearbyPlaceComponent implements OnChanges {
  @Input()
  place: Place;

  @Input()
  referencePlace: Place = null;

  constructor() {}

  ngOnChanges() {}
}
