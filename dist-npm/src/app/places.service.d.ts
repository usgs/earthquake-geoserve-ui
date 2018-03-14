import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CoordinatesService } from './coordinates.service';
export declare class PlacesService {
    private coordinatesService;
    private http;
    readonly PLACES_URL: string;
    private _places;
    readonly places: Observable<any>;
    constructor(coordinatesService: CoordinatesService, http: HttpClient);
    empty(): void;
    getPlaces(latitude: number, longitude: number): void;
    private handleError<T>(action, result?);
    buildUrl(latitude: number, longitude: number): string;
}
