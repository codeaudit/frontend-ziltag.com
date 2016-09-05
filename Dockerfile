FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i -g pm2 eslint babel-eslint
COPY package.json /usr/src/app/package.json
RUN npm i
COPY . /usr/src/app
COPY env.prod.js /usr/src/app/env.js
RUN npm run build

EXPOSE 2000 2001

CMD npm start
