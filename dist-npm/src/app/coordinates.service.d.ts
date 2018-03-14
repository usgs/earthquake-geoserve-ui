import { Observable } from 'rxjs/Observable';
import { Coordinates } from './coordinates';
export declare class CoordinatesService {
    private _coordinates;
    readonly coordinates: Observable<Coordinates>;
    constructor();
    /** Constant used to indicate high degree of confidence. */
    HIGH_CONFIDENCE: number;
    /** Constant used to indicate above average confidence. */
    ABOVE_AVERAGE_CONFIDENCE: number;
    /** Constant used to indicate moderate degree of confidence. */
    AVERAGE_CONFIDENCE: number;
    /** Constant used to indicate below average confidence. */
    BELOW_AVERAGE_CONFIDENCE: number;
    /** Constant used to indicate low degree of confidence. */
    LOW_CONFIDENCE: number;
    /** Constant used to indicate very low degree of confidence. */
    NO_CONFIDENCE: number;
    /**
     * Constant used to indicate confidence was not computed or an error occurred
     * while computing the confidence
     */
    NOT_COMPUTED: number;
    /**
     * Compute Confidence given latitude and longitude. Latitude and longitude
     * must be strings to keep accuracy.
     * Confidence is based on the number of digits past the decimal.
     *
     * @params latititude {String}
     * @params longitude {String}
     *
     */
    computeFromCoordinates(latitude: string, longitude: string): number;
    /**
     * Compute Confidence given a geocode result location with an extent.
     *
     * @params geocodeLocation {object}
     *      an esri response via the ArcGIS REST API
     *
     * @see https://developers.arcgis.com/en/features/geocoding/
     */
    computeFromGeocode(geocodeLocation: any): number;
    /**
     * Compute Confidence given a accuracy in meters.
     * used by GeoLocate.
     * @params accuracy {number} indicates the accuracy in meters at 95%
     *         confidence.
     */
    computeFromGeolocate(accuracy: number): number;
    /**
     * Compute Confidence given a zoom level.
     * @params zoom {number} indicates the zoom level of the map.
     */
    computeFromPoint(zoom: number): number;
    /**
     * Compute zoom level given a confidence.
     * @params confidence {number} indicates the confidence level
     */
    computeZoomFromConfidence(confidence: number): number;
    /**
     * returns rounded value based on confidence value.
     *
     * @params  {string | number} value
     *           value to be rounded
     * @params  {number} confidence
     *           confidence value
     * @returnn {number} rounded value
     *
     */
    roundLocation(value: any, confidence: any): number;
    /**
     * Set the coordinate observable.next value
     * @params {string} latitude  [description]
     * @params {string} longitude [description]
     */
    setCoordinates(location: any): void;
}
