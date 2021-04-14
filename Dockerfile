FROM node:12.19.0-alpine3.9 AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build


FROM node:12.19.0-alpine3.9 as production
EXPOSE 5000
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY --from=development /usr/src/app/dist ./dist
COPY ormconfig.docker.json ./ormconfig.json
COPY .env .
CMD ["node", "dist/main"]