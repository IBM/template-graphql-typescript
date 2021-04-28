FROM registry.access.redhat.com/ubi8/nodejs-12:1-77 AS builder

USER root

RUN yum install -y python36 && yum clean all

WORKDIR /opt/app-root/src

USER default

COPY . .

RUN npm install
RUN npm run build

FROM registry.access.redhat.com/ubi8/nodejs-12:1-77

COPY --from=builder /opt/app-root/src/dist dist
COPY package*.json ./
RUN npm install --production

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000/tcp

USER root

RUN dnf -y update-minimal --security --sec-severity=Important --sec-severity=Critical && dnf clean all

COPY ./licenses /licenses

USER default

LABEL name="Typescript GraphQL" \
      vendor="IBM" \
      version="v1.0.0" \
      release="1" \
      summary="This is an example of a container image." \
      description="This container image will deploy a Typescript GraphQL App"

CMD ["npm","run","serve"]
