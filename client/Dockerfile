# base layer

FROM node:23-alpine AS base

ARG VITE_MAPBOX_API_KEY
ARG VITE_MAPBOX_STYLE_URL
ARG VITE_API_URL

ENV VITE_MAPBOX_API_KEY=$VITE_MAPBOX_API_KEY
ENV VITE_MAPBOX_STYLE_URL=$VITE_MAPBOX_STYLE_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package*.json .

RUN npm install -g npm

RUN npm install

COPY . .
 
# build layer

FROM base AS build

RUN npm run build

# development layer
FROM base AS development

EXPOSE 80 81

CMD ["npm", "run", "dev"]

# production layer

FROM nginx:alpine AS production

RUN apk update && apk upgrade

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]