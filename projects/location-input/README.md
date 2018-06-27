# Hazdev Angular Location Input

User interface to accept a geolocated, geocoded, or coordinate location to be
input.

## Using the Location Input

Install the hazdev-ng-location-input
```
npm install hazdev-ng-location-input
```

Add leaflet assets if you are using the LocationMapComponent
```
  {
    "glob": "**/*",
    "input": "node_modules/leaflet/dist/images",
    "output": "/leaflet"
  }

```

Import the LocationInputModule to use the location input
```
import { LocationInputModule } from 'hazdev-ng-location-input';
…
@NgModule({
  imports: [
    LocationInputModule.forRoot()
  ],
  …
})
```

Add the LocationMapComponent to your application
```
<location-input-map></location-input-map>
```


Subscribe to the coordinates service to access the selected location
```
import { Coordinates, CoordinatesService } from 'hazdev-ng-location-input';

this.coordinatesService.coordinates$.subscribe((coordinates: Coordinates) => {
 console.log(coordinates);
});
```
