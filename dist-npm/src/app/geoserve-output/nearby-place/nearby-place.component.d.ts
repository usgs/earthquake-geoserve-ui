import { OnInit } from '@angular/core';
export declare class NearbyPlaceComponent implements OnInit {
    place: any;
    constructor();
    ngOnInit(): void;
    getName(place: any): string;
    getDistance(place: any): string;
    getPopulation(place: any): string;
    compassWinds(azimuth: any): string;
    kmToMi(km: number): number;
    round(raw: number, decimals: number): number;
}
