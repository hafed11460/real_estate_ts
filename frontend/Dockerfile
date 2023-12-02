FROM node:18.18-alpine3.17 as builder
WORKDIR /app
COPY . .

RUN npm install

# CMD [ "npm","start"]
CMD [ "npm","run","build" ]