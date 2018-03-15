# Earthquake Geoserve UI
User interface from Geoserve web service data.

[![Build Status](https://travis-ci.org/usgs/earthquake-geoserve-ui.svg?branch=master)](https://travis-ci.org/usgs/earthquake-geoserve-ui)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bc4483e5ad814d5f857d493827e1bf63)](https://www.codacy.com/app/usgs/earthquake-geoserve-ui?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=usgs/earthquake-geoserve-ui&amp;utm_campaign=Badge_Grade)
[![Coverage](https://api.codacy.com/project/badge/Coverage/bc4483e5ad814d5f857d493827e1bf63)](https://www.codacy.com/app/usgs/earthquake-geoserve-ui?utm_source=github.com&utm_medium=referral&utm_content=usgs/earthquake-geoserve-ui&utm_campaign=Badge_Coverage)


Building
--------

This project is intended to be deployed as a Docker container. Building in this
sense requires first buidling distributables from the Angular source code, and
then loading those distributables into an image for distribution.

### Angular Build

Build the distributables from the Angular source using the `ng` command line
tool.
```
$ ng build --prod
```

### NPM Publish Geoserve Components

Build/Publish the npm distributable from the Angular source using the `ng` command line
tool.
```
$ ng run npm-publish
```
Then the distributable tar file can be installed in your project using `npm install`.
```
$ npm install <path>/<to>/<application>/npm-dist/earthquake-geoserve-ui-<version>.tgz
```

### Container Image

A `Dockerfile` is provided to build the image. This Dockerfile accepts a
`--build-arg BASE_IMAGE=SOME_IMAGE` as a command line switch to specify a
custom image. By default it uses the NGINX latest image from the Docker library.
```
$ cd PROJECT_ROOT
$ docker build --build-arg BASE_IMAGE=SOME_BASE_IMAGE -t IMAGE_TAG .
```
> Note: The following variables from the previous snippet should be replaced
>       with values relevant to the intended build.
- `PROJECT_ROOT`
  The directory containing the project source.
- `SOME_IMAGE`
  The name of the base image to build from.
- `IMAGE_TAG`
  The name of the tag to create.

For example:
```
$ cd ~/earthquake-geoserve-ui
$ docker build --build-arg BASE_IMAGE=nginx:latest -t local/earthquake-geoserve-ui:latest .
```
> Note: In this specific example, the specified `BASE_IMAGE` is the same as
>       what would be used by default and could thus be ommitted. It is
>       included here only to illustrate the example.


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
