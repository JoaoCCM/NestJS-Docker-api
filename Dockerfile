FROM node:12.19.0-alpine3.9 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install && npm cache clean --force

RUN npm run build

EXPOSE 5000

COPY . .

CMD ["node", "dist/main.ts"]