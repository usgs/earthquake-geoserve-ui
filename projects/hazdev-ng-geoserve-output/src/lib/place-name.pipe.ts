import { Pipe, PipeTransform } from '@angular/core';

import { Place } from './place';

@Pipe({
  name: 'placeName'
})
export class PlaceNamePipe implements PipeTransform {
  transform(place: Place): any {
    if (!place) {
      return null;
    }

    const placeArr = [place.name, place.admin1_name, place.country_name].filter(
      str => !!str
    );

    return placeArr.join(', ');
  }
}
