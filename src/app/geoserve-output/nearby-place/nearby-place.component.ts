import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nearby-place',
  templateUrl: './nearby-place.component.html',
  styleUrls: ['./nearby-place.component.css']
})
export class NearbyPlaceComponent implements OnInit {
  @Input() place: any;

  constructor() { }

  ngOnInit() {
  }

  getName (place: any): string  {
    return (place.properties.name + ', '
      + place.properties.admin1_name + ', '
      + place.properties.country_name
    );
  }

  getDistance (place: any): string {
    const distanceKm = place.properties.distance;

    return (
      this.round(distanceKm, 1) + 'km '
      + '(' + this.round(this.kmToMi(distanceKm), 1) + 'mi) '
      + this.compassWinds(place.properties.azimuth)
    );
  }

  getPopulation (place: any): string {
    return 'Population: ' + place.properties.population;
  }

  compassWinds (azimuth: any): string {
    const fullwind = 22.5;
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];

    // if direction is already in compass points
    if (directions.indexOf(azimuth) > -1) {
      return azimuth;
    }

    return directions[(Math.round((azimuth % 360) / fullwind))];
  }

  kmToMi (km: number): number {
    return km * 0.621371;
  }

  round (raw: number, decimals: number): number {
    const factor = Math.pow(10, decimals);

    return Math.round(raw * factor) / factor;
  }
}
