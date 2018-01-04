import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CoordinatesService } from '../coordinates.service';

@Component({
  selector: 'app-coordinate-input',
  templateUrl: './coordinate-input.component.html',
  styleUrls: ['./coordinate-input.component.css']
})
export class CoordinateInputComponent implements OnInit {
  constructor (
    private coordinatesService: CoordinatesService,
    private dialogRef: MatDialogRef<CoordinateInputComponent>
  ) { }

  ngOnInit () {
  }

  handleClick (latitude: string, longitude: string) {
    // set location
    this.coordinatesService.setCoordinates({
      latitude: latitude,
      longitude: longitude,
      method: 'coordinate'
    });
    // Use injected reference to close dialog
    this.dialogRef.close();
  }
}
