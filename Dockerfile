FROM node:10 AS builder
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

FROM builder AS development
WORKDIR /usr/src/app
EXPOSE 3000
COPY --from=builder /usr/src/app ./
CMD ["npm", "run", "start:prod"]