FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm i -g pm2

RUN npm i
RUN npm run build

EXPOSE 2000 2001

CMD npm start
