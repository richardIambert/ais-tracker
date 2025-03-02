FROM node:23-alpine

RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]