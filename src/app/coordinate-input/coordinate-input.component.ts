import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-coordinate-input',
  templateUrl: './coordinate-input.component.html',
  styleUrls: ['./coordinate-input.component.css']
})
export class CoordinateInputComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handleClick (latitude: string, longitude: string) {
    this.search.emit({
      latitude: +latitude,
      longitude: +longitude
    });
  }

}
