ARG BASE_IMAGE=nginx:latest
FROM ${BASE_IMAGE}


RUN mkdir -p /usr/share/nginx/html/geoserve
COPY dist/ /usr/share/nginx/html/geoserve/
COPY 00-server.conf /etc/nginx/default.d/


# Inherit CMD from BASE_IMAGE
