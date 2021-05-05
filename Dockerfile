FROM registry.access.redhat.com/ubi8/nodejs-14:1-28.1618434924 AS builder

WORKDIR /opt/app-root/src

COPY . .

RUN npm install
RUN npm run build

FROM registry.access.redhat.com/ubi8/nodejs-14:1-28.1618434924

COPY --from=builder /opt/app-root/src/dist dist
COPY package*.json ./
RUN npm install --production

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000/tcp

USER root

## Uncomment the below line to update image security content if any
# RUN dnf -y update-minimal --security --sec-severity=Important --sec-severity=Critical && dnf clean all

COPY ./licenses /licenses

USER default

LABEL name="ibm/template-graphql-typescript" \
      vendor="IBM" \
      version="1" \
      release="28" \
      summary="This is an example of a container image." \
      description="This container image will deploy a Typescript GraphQL App"

CMD ["npm","run","serve"]
