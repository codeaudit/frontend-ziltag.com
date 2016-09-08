FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./src /usr/src/app/src
COPY ./ssl /usr/src/app/ssl
COPY ./webpack /usr/src/app/webpack
COPY ./package.json /usr/src/app/package.json
COPY ./env.js /usr/src/app/env.js

RUN npm i -g pm2

RUN npm i
RUN npm run build

EXPOSE 2000 2001

CMD npm start
