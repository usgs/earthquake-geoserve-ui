import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'geoserve-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() TITLE: any;
  @Input() DATA: any;
  constructor() { }

  ngOnInit() {
  }

}
