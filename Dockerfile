FROM node:14.5.0-alpine3.10

ADD /build /build

RUN npm install -g serve

EXPOSE 5000

ENTRYPOINT [ "serve", "-s", "build", "-p", "5000" ]
