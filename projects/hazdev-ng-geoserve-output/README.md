# Geoserve Output

Angular library for fetching/displaying geoserve data

## Example Implementation

[https://earthquake.usgs.gov/geoserve/](https://earthquake.usgs.gov/geoserve/)

## Gettings Started

Install the hazdev-ng-geoserve-output

```
npm install hazdev-ng-geoserve-output
```

## Using hazdev-ng-geoserve-output

Import the GeoserveOutputModule into your module

```
import { GeoserveOutputModule } from 'hazdev-ng-geoserve-output';
...
@NgModule({
  imports: [
    GeoserveOutputModule.forRoot()
  ],
  ...
})
```

Add any of the geoserve components that you wish to use to your component template:

```
<geoserve-admin-region></geoserve-admin-region>
```

The following is a list of all the geoserve components:

Regions:

- geoserve-admin-region
- geoserve-authoritative-region
- geoserve-neic-catalog-region
- geoserve-neic-response-region
- geoserve-offshore-region
- geoserve-tectonic-summary-region

Places:

- geoserve-nearby-places

## Providing data to the hazev-ng-geoserve-output component

Data is not directly passed to a geoserve component, each component listens to
either a `PlacesService` or a `RegionsService`. By default the components will
display no data until a latitude/longitude coordinate has been queried by
either a places or regions service.

### Querying for geoserve data

Query the regions/places service to display geoserve data

```
import { PlacesService, RegionsService } from 'hazdev-ng-geoserve-output';
...
export class YourComponent implements onInit {
  constructor(
    public placesService: PlacesService,
    public regionsService: RegionsService
  ) {}
...
  ngOnInit() {
    const latitude = 35;
    const longitude = -105;

    /* pass coordinates to the places service */
    this.placesService.getPlaces(latitude, longitude);

    /* pass coordinates to the regions service */
    this.regionsService.getRegions(latitude, longitude);
  }
...
}
```

Calling `getRegions` or `getPlaces` will make an Xhr request to the geoserve
web service and update the `regions$` or `places$` observable (respectively).
Based on the component that you chose you will need to query either the
region or places service. In the example above the `geoserve-admin-region`
should now be displaying admin region data for the 35, -105 coordinate that was
queried by `this.regionsService.getRegions`.
