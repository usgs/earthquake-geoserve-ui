import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CoordinatesService } from '../coordinates.service';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';

@Component({
  selector: 'app-geoserve',
  templateUrl: './geoserve.component.html',
  styleUrls: ['./geoserve.component.css']
})
export class GeoserveComponent implements OnInit {
  public control;

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
