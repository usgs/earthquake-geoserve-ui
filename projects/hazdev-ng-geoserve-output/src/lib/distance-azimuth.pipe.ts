import { Pipe, PipeTransform } from '@angular/core';
import { Place } from './place';
import { getDistanceAzimuth } from './distance-azimuth';

@Pipe({
  name: 'distanceAzimuth'
})
export class DistanceAzimuthPipe implements PipeTransform {
  compassWinds(azimuth: string | number): string {
    const fullwind = 22.5;
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
      'N'
    ];

    // if direction is already in compass points
    if (typeof azimuth === 'string' && directions.indexOf(azimuth) > -1) {
      return azimuth;
    }

    // adjust azimuth if negative
    azimuth = +azimuth;
    while (azimuth < 0) {
      azimuth = azimuth + 360;
    }

    return directions[Math.round((azimuth % 360) / fullwind)];
  }

  kmToMi(km: number): number {
    return km * 0.621371;
  }

  round(raw: number, decimals: number): number {
    const factor = Math.pow(10, decimals);

    return Math.round(raw * factor) / factor;
  }

  transform(place: Place, referencePlace?: Place): any {
    if (!place) {
      return null;
    }

    const distAz = getDistanceAzimuth(place, referencePlace);
    const azimuth = distAz.azimuth;
    const distance = distAz.distance;

    return (
      this.round(distance, 1) +
      ' km ' +
      '(' +
      this.round(this.kmToMi(distance), 1) +
      ' mi) ' +
      this.compassWinds(azimuth)
    );
  }
}
