FROM node:12.19.0-alpine3.9 

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && apk upgrade
RUN apk add python3 g++ make
RUN npm install glob rimraf

RUN npm install && npm cache clean --force


EXPOSE 5000

COPY . .

CMD [ "npm","run", "start:dev" ]