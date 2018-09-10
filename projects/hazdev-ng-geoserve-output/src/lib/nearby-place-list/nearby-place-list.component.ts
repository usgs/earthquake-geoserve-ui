import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../place';

@Component({
  selector: 'geoserve-nearby-place-list',
  templateUrl: './nearby-place-list.component.html',
  styleUrls: ['./nearby-place-list.component.css']
})
export class NearbyPlaceListComponent implements OnInit {
  @Input() places: Place[];

  constructor() { }

  ngOnInit() {
  }

}
