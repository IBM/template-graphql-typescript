FROM registry.access.redhat.com/ubi9/nodejs-22:9.5-1737605092 AS builder

WORKDIR /opt/app-root/src

COPY --chown=default:root . .

RUN mkdir -p /opt/app-root/src/node_modules && \
    ls -lA && \
    npm ci && \
    npm run build

FROM registry.access.redhat.com/ubi9/nodejs-22-minimal:9.5-1737619681

## Uncomment the below lines to update image security content if any
# USER root
# RUN dnf -y update-minimal --security --sec-severity=Important --sec-severity=Critical && dnf clean all

LABEL name="ibm/template-graphql-typescript" \
      vendor="IBM" \
      version="9" \
      release="5" \
      summary="This is an example of a container image." \
      description="This container image will deploy a Typescript Node App"

WORKDIR /opt/app-root/src

COPY --from=builder --chown=1001:root /opt/app-root/src/dist dist

COPY --chown=1001:root package*.json ./

RUN ls -lA && \
    mkdir -p /opt/app-root/src/node_modules && \
    npm ci --omit=dev

COPY --chown=1001:root licenses licenses
COPY --chown=1001:root public public
# COPY --chown=1001:root licenses /licenses

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000/tcp

CMD ["npm", "run", "start"]

