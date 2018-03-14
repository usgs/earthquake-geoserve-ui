import { OnInit } from '@angular/core';
import { CoordinatesService } from '../../coordinates.service';
export declare class LocationOutputComponent implements OnInit {
    coordinatesService: CoordinatesService;
    constructor(coordinatesService: CoordinatesService);
    ngOnInit(): void;
}
