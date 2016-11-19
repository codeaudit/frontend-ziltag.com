FROM node:7-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --no-cache git

RUN npm i -g pm2
COPY ./package.json /usr/src/app/package.json
RUN npm i

COPY ./ssl /usr/src/app/ssl
COPY ./env.js /usr/src/app/env.js
COPY ./webpack /usr/src/app/webpack
COPY ./src /usr/src/app/src
RUN npm run build

EXPOSE 2000 2001

CMD npm start
