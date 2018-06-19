import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  CoordinatesService,
  LocationDialogComponent
} from 'location-input';

@Component({
  selector: 'app-geoserve-output',
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
