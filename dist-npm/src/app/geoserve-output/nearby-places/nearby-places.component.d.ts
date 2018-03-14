import { OnInit } from '@angular/core';
import { PlacesService } from '../../places.service';
export declare class NearbyPlacesComponent implements OnInit {
    readonly placesService: PlacesService;
    constructor(placesService: PlacesService);
    ngOnInit(): void;
}
