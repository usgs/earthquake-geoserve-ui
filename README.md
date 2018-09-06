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


### Package & Publish

Package from the Angular source using ng-packgr. This script packages the application into an npm distributable that can be published.

```
$ npm run package
```

The bundled application in the `dist-npm` folder should be tagged and pushed to npm so that it can be imported into other projects.

```
$ npm publish dist-npm --tag <version>
```

The package can now be installed via npm by referencing the `earthquake-geoserve-ui` package name.

```
$ npm install earthquake-geoserve-ui@<version>
```


## Using the Geoserve Components

Follow these steps to use any of the geoserve components in your application.


### Geoserve Component Selectors

The `GeoserveOutputModule` contains the following component selectors:

* geoserve-admin-region
* geoserve-authoritative-region
* geoserve-nearby-places
* geoserve-neic-catalog-region
* geoserve-neic-response-region
* geoserve-offshore-region
* geoserve-tectonic-summary-region


### Installing & Importing

To use the component selectors you must import the correct modules and services into your application.

1. Install the earthquake-geoserve-ui project

    ```
    npm install earthquake-geoserve-ui
    ```

1. Import the `GeoserveOutputModule` and `GeoserveCoreModule` from the `earthquake-geoserve-ui`

    ```
    /** app.module.ts */

    import { GeoserveCoreModule, GeoserveOutputModule } from 'earthquake-geoserve-ui';
    ...
    imports: [
        GeoserveCoreModule.forRoot(),
        GeoserveOutputModule
    ]
    ```

1. Add the desired geoserve components to your component template

    ```
    /* some.component.html */

    <geoserve-admin-region></geoserve-admin-region>
    <geoserve-nearby-places></geoserve-nearby-places>
    <geoserve-tectonic-summary-region></geoserve-tectonic-summary-region>
    ```

1. Import the `CoordinatesService` and use the `setCoordinates()` method to set the coordinate location for the geoserve components. The geoserve components are subscribed to coordinate changes and will trigger a region/place change when the coordinates are updated.

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

1. With the coordinates set the geoserve components should now display region/place information for the selected coordinates.


## General Angular Information

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
