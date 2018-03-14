import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class LocationDialogComponent implements OnInit {
    dialogRef: MatDialogRef<LocationDialogComponent>;
    constructor(dialogRef: MatDialogRef<LocationDialogComponent>);
    ngOnInit(): void;
}
