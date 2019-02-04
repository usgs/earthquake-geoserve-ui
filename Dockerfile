ARG FROM_IMAGE=usgs/nginx:latest
ARG BUILD_IMAGE=usgs/node:10


FROM ${BUILD_IMAGE} as buildenv

COPY --chown=usgs-user:usgs-user . /earthquake-geoserve-ui
WORKDIR /earthquake-geoserve-ui

RUN /bin/bash --login -c "\
    npm install --no-audit --no-save && \
    npm run build && \
    npm run buildApp \
  "


FROM ${FROM_IMAGE}

RUN mkdir -p /usr/share/nginx/html/geoserve

COPY --from=buildenv \
  --chown=usgs-user:usgs-user \
  /earthquake-geoserve-ui/dist/ \
  /usr/share/nginx/html/geoserve/

COPY --from=buildenv \
  --chown=usgs-user:usgs-user \
  /earthquake-geoserve-ui/metadata.json \
  /usr/share/nginx/html/geoserve/.

COPY --from=buildenv \
  --chown=usgs-user:usgs-user \
  /earthquake-geoserve-ui/01-server.conf \
  /etc/nginx/default.d/.

COPY --from=buildenv \
  --chown=usgs-user:usgs-user \
  /earthquake-geoserve-ui/00-hook.sh \
  /startup-hooks/.


# Inherit CMD from FROM_IMAGE
