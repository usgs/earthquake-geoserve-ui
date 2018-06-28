import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  CoordinatesService,
  LocationDialogComponent
} from 'hazdev-ng-location-input';

@Component({
  selector: 'geoserve-output',
  templateUrl: './geoserve-output.component.html',
  styleUrls: ['./geoserve-output.component.css']
})
export class GeoserveOutputComponent implements OnInit {

  constructor (
    public coordinatesService: CoordinatesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onClick(): void {
    if (this.dialog && LocationDialogComponent) {
      this.dialog.open(LocationDialogComponent);
    }
  }
}
