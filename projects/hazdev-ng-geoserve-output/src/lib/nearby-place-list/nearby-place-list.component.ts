import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../place';

@Component({
  selector: 'geoserve-nearby-place-list',
  styleUrls: ['./nearby-place-list.component.css'],
  templateUrl: './nearby-place-list.component.html'
})
export class NearbyPlaceListComponent implements OnInit {
  @Input()
  places: Place[];

  constructor() {}

  ngOnInit() {}
}
