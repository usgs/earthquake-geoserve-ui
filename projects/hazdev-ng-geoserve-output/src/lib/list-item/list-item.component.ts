import { Component, Input } from '@angular/core';

@Component({
  selector: 'geoserve-list-item',
  styleUrls: ['./list-item.component.css'],
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {
  @Input()
  DATA: any;

  @Input()
  TITLE: any;

  constructor() {}
}
