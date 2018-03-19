#!/bin/bash -e

NPM_BUILD=dist-npm

## compile for npm release
npm run packagr

## package for local development
cd $NPM_BUILD
npm pack

## publish for deployment
#npm publish

echo "done!"