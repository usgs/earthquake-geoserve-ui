ARG BASE_IMAGE=usgs/nginx:latest
FROM ${BASE_IMAGE}

RUN mkdir -p /usr/share/nginx/html/geoserve

COPY --chown=usgs-user:usgs-user dist/ /usr/share/nginx/html/geoserve/
COPY --chown=usgs-user:usgs-user 01-server.conf /etc/nginx/default.d/
COPY --chown=usgs-user:usgs-user 00-hook.sh /startup-hooks/.


# Inherit CMD from BASE_IMAGE
