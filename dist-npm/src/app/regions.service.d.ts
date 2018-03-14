import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CoordinatesService } from './coordinates.service';
export declare class RegionsService {
    private coordinatesService;
    private http;
    REGIONS_URL: string;
    private _adminRegions;
    private _authoritative;
    private _coordinates;
    private _neicCatalog;
    private _neicResponse;
    private _tectonic;
    private _offshoreRegions;
    readonly adminRegions: Observable<any>;
    readonly authoritative: Observable<any>;
    readonly coordinates: Observable<any>;
    readonly neicCatalog: Observable<any>;
    readonly neicResponse: Observable<any>;
    readonly offshoreRegions: Observable<any>;
    readonly tectonic: Observable<any>;
    constructor(coordinatesService: CoordinatesService, http: HttpClient);
    empty(): void;
    getRegions(latitude: number, longitude: number): void;
    private handleError<T>(action, result?);
    buildUrl(latitude: number, longitude: number): string;
}
