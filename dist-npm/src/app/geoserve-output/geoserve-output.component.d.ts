import { MatDialog } from '@angular/material';
import { Coordinates } from '../coordinates';
import { CoordinatesService } from '../coordinates.service';
export declare class GeoserveOutputComponent {
    coordinatesService: CoordinatesService;
    dialog: MatDialog;
    coordinates: Coordinates;
    constructor(coordinatesService: CoordinatesService, dialog: MatDialog);
    onClick(): void;
}
