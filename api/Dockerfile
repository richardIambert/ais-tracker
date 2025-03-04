# base layer

FROM node:23-alpine AS base

RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json .

RUN npm install -g npm

RUN npm install --production

COPY . .

EXPOSE 3000

# development layer
FROM base AS development

RUN npm install --production=false

CMD ["npm", "run", "dev"]

# production layer
FROM base AS production

CMD [ "npm", "start" ]