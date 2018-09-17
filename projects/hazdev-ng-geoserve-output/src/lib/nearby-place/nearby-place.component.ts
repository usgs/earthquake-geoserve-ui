import { Component, Input } from '@angular/core';
import { Place } from '../place';

@Component({
  selector: 'geoserve-nearby-place',
  styleUrls: ['./nearby-place.component.css'],
  templateUrl: './nearby-place.component.html'
})
export class NearbyPlaceComponent {
  @Input()
  place: Place;

  constructor() {}

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

    return directions[Math.round((+azimuth % 360) / fullwind)];
  }

  getDistance(place: Place): string {
    const distanceKm = place.distance;

    return (
      this.round(distanceKm, 1) +
      ' km ' +
      '(' +
      this.round(this.kmToMi(distanceKm), 1) +
      ' mi) ' +
      this.compassWinds(place.azimuth)
    );
  }

  getName(place: Place): string {
    const placeArr = [place.name, place.admin1_name, place.country_name].filter(
      str => !!str
    );

    return placeArr.join(', ');
  }

  getPopulation(place: Place): string {
    return 'Population: ' + (place.population || '-');
  }

  kmToMi(km: number): number {
    return km * 0.621371;
  }

  round(raw: number, decimals: number): number {
    const factor = Math.pow(10, decimals);

    return Math.round(raw * factor) / factor;
  }
}
