import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../place';

@Component({
  selector: 'geoserve-nearby-place',
  templateUrl: './nearby-place.component.html',
  styleUrls: ['./nearby-place.component.css']
})
export class NearbyPlaceComponent implements OnInit {
  @Input() place: Place;

  constructor() { }

  ngOnInit() {
  }

  getName(place: Place): string  {
    const placeArr = [
      place.name || '',
      place.admin1_name || '',
      place.country_name || ''
    ].filter(str => !!str);

    return placeArr.join(', ');
  }

  getDistance(place: Place): string {
    const distanceKm = place.distance;

    return (
      this.round(distanceKm, 1) + ' km '
      + '(' + this.round(this.kmToMi(distanceKm), 1) + ' mi) '
      + this.compassWinds(place.azimuth)
    );
  }

  getPopulation(place: Place): string {
    return 'Population: ' + (place.population || '-');
  }

  compassWinds(azimuth: string | number): string {
    const fullwind = 22.5;
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];

    // if direction is already in compass points
    if (typeof azimuth === 'string' && directions.indexOf(azimuth) > -1) {
      return azimuth;
    }

    return directions[(Math.round((+azimuth % 360) / fullwind))];
  }

  kmToMi(km: number): number {
    return km * 0.621371;
  }

  round(raw: number, decimals: number): number {
    const factor = Math.pow(10, decimals);

    return Math.round(raw * factor) / factor;
  }
}
