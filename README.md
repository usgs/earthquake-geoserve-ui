# Earthquake Geoserve UI
User interface from Geoserve web service data.

[![Build Status](https://travis-ci.org/usgs/earthquake-geoserve-ui.svg?branch=master)](https://travis-ci.org/usgs/earthquake-geoserve-ui)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bc4483e5ad814d5f857d493827e1bf63)](https://www.codacy.com/app/usgs/earthquake-geoserve-ui?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=usgs/earthquake-geoserve-ui&amp;utm_campaign=Badge_Grade)
[![Coverage](https://api.codacy.com/project/badge/Coverage/bc4483e5ad814d5f857d493827e1bf63)](https://www.codacy.com/app/usgs/earthquake-geoserve-ui?utm_source=github.com&utm_medium=referral&utm_content=usgs/earthquake-geoserve-ui&utm_campaign=Badge_Coverage)


## Getting Started:

How to preview the project in your browser:

1. Install NPM dependencies
    ```
    npm install
    ```

1. Preview in a browser
    ```
    ng serve -o
    ```
    The application should open (flag -o) in your browser.


## Building

This project is intended to be deployed as an NPM package. Building in this
sense requires packaging the application from the Angular source code, and
then publishing that package to npm [earthquake-geoserve-ui](https://www.npmjs.com/package/earthquake-geoserve-ui).


### NPM Publish Geoserve Components

Build/Publish the npm distributable from the Angular source using the `ng` command line
tool.

```
$ npm run package
```

The tar file in `dist-npm` folder should be tagged and pushed to npm to facilitate widespread consumption:

```
npm publish dist-npm --tag <version>
```

The `ng run package` runs a script that bundles the npm package into a tar file that is fully distributable. The tar file can be imported by running a local npm install or referencing the tagged npm distributable above:

```
$ npm install earthquake-geoserve-ui@<version>
```


## Using the Geoserve components

Follow these steps to use any of the geoserve components in your application (selectors listed below). 

1. Install the earthquake-geoserve-ui project
    ```
    npm install earthquake-geoserve-ui
    ```
1. Import the `GeoserveOutputModule` and `CoreModule` from the `earthquake-geoserve-ui`
    ```
    /** app.module.ts */

    import { GeoserveOutputModule } from 'earthquake-geoserve-ui';
    import { CoreModule as GeoserveCoreModule } from 'earthquake-geoserve-ui';
    ...
    imports: [
        GeoserveCoreModule.forRoot(),
        GeoserveOutputModule
    ]
    ```
1. Add the geoserve components to your component template
    ```
    /* some.component.html */

    <app-admin-region></app-admin-region>
    <app-nearby-places></app-nearby-places>
    <app-tectonic-summary-region></app-tectonic-summary-region>
    ```
1. Then, from the component typescript file import the `CoordinatesService` and use the `setCoordinates()` method to set the coordinate location for the geoserve components. The geoserve components are subscribed to coordinate changes and will trigger a region/place changed when the coordinates are updated.
    ```
    /* some.component.ts */

    import { CoordinatesService } from 'earthquake-geoserve-ui';
    ...
    constructor(
        public coordinatesService: CoordinatesService
    ) { }
    ...
    this.coordinatesService.setCoordinates({
        longitude: 35,
        latitude: -105
    });
    ```

### Geoserve Component Selectors

The `GeoserveOutputModule` contains the following  geoserve component selectors:

* app-admin-region
* app-authoritative-region
* app-nearby-places
* app-neic-catalog-region
* app-neic-response-region
* app-offshore-region
* app-tectonic-summary-region

General Angular Information
---------------------------

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
