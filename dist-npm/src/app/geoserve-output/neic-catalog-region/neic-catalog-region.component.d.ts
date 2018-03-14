import { OnInit } from '@angular/core';
import { RegionsService } from '../../regions.service';
export declare class NeicCatalogRegionComponent implements OnInit {
    readonly regionsService: RegionsService;
    constructor(regionsService: RegionsService);
    ngOnInit(): void;
}
