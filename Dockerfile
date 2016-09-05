FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i -g pm2
COPY package.json /usr/src/app/package.json
RUN npm i
COPY . /usr/src/app
RUN npm run build

EXPOSE 2000 2001

CMD npm start
