import {Injectable } from '@angular/core';

@Injectable()
export class Util {

  // ----------------------------------------------------------------------
  // Public Static Variables
  // ----------------------------------------------------------------------

  /** Constant used to indicate high degree of confidence. */
  HIGH_CONFIDENCE = 5;

  /** Constant used to indicate above average confidence. */
  ABOVE_AVERAGE_CONFIDENCE = 4;

  /** Constant used to indicate moderate degree of confidence. */
  AVERAGE_CONFIDENCE = 3;

  /** Constant used to indicate below average confidence. */
  BELOW_AVERAGE_CONFIDENCE = 2;

  /** Constant used to indicate low degree of confidence. */
  LOW_CONFIDENCE = 1;

  /** Constant used to indicate very low degree of confidence. */
  NO_CONFIDENCE = 0;

  /**
   * Constant used to indicate confidence was not computed or an error occurred
   * while computing the confidence
   */
  NOT_COMPUTED = -1;

  /**
   * Compute Confidence given latitude and longitude. Latitude and longitude
   * must be strings to keep accuracy.
   * Confidence is based on the number of digits past the decimal.
   *
   * @params latititude {String}
   * @params longitude {String}
   *
   */
  public computeFromCoordinates (latitude: string, longitude: string) {
    if (typeof latitude !== 'string' || typeof longitude !== 'string') {
      return this.NOT_COMPUTED;
    }

    var latitudePieces = latitude.split('.'),
        longitudePieces = longitude.split('.'),
        minDecimals;

    if (latitudePieces.length === 1 || longitudePieces.length === 1) {
      minDecimals = 0;
    } else {
      minDecimals = Math.min(latitudePieces[1].length,
          longitudePieces[1].length);
    }


    if (minDecimals >= 5) {
      return this.HIGH_CONFIDENCE;
    } else if (minDecimals >= 4) {
      return this.ABOVE_AVERAGE_CONFIDENCE;
    } else if (minDecimals >= 3) {
      return this.AVERAGE_CONFIDENCE;
    } else if (minDecimals >= 2) {
      return this.BELOW_AVERAGE_CONFIDENCE;
    } else if (minDecimals >= 1) {
      return this.LOW_CONFIDENCE;
    } else if (minDecimals >= 0) {
      return this.NO_CONFIDENCE;
    } else {
      return this.NOT_COMPUTED;
    }
  }


  /**
   * Compute zoom level given a confidence.
   * @params confidence {number} indicates the confidence level
   */
  public computeZoomFromConfidence (confidence: number) {
    if (confidence === this.HIGH_CONFIDENCE) {
      return 16;
    } else if( confidence === this.ABOVE_AVERAGE_CONFIDENCE) {
      return 13;
    } else if( confidence === this.AVERAGE_CONFIDENCE) {
      return 9;
    } else if( confidence === this.BELOW_AVERAGE_CONFIDENCE) {
      return 5;
    } else if( confidence === this.LOW_CONFIDENCE) {
      return 1;
    } else {
      return 1;
    }
  }

}
