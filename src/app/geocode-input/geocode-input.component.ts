import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CoordinatesService } from '../coordinates.service';

@Component({
  selector: 'app-geocode-input',
  templateUrl: './geocode-input.component.html',
  styleUrls: ['./geocode-input.component.css']
})
export class GeocodeInputComponent implements OnInit {
  @Input() showProgressBar: boolean;

  constructor(
    private coordinatesService: CoordinatesService,
    private dialogRef: MatDialogRef<GeocodeInputComponent>
  ) { }

  ngOnInit() {
    this.showProgressBar = false;
  }

  doGeocode (address: string): void {
    console.log(this);
    console.log(address);
    this.showProgressBar = true;
    this.dialogRef.close();
  }
}
