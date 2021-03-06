#!/bin/bash

# Replace apiUrl if specified by environment
if [ -n "${CUSTOM_API_URL}" ]; then
  sed --in-place \
    "s|apiUrl:\"[^\"]*\"|apiUrl:\"${CUSTOM_API_URL}\"|g" \
    /usr/share/nginx/html/geoserve/main.*.js;
fi

if [ -n "${SITE_URL}" ]; then
  sed --in-place \
    "s|siteUrl:\"[^\"]*\"|siteUrl:\"${SITE_URL}\"|g" \
    /usr/share/nginx/html/geoserve/main.*.js;
fi