FROM node:23-alpine AS builder

ARG VITE_MAPBOX_API_KEY
ARG VITE_MAPBOX_STYLE_URL
ARG VITE_API_URL

ENV VITE_MAPBOX_API_KEY=$VITE_MAPBOX_API_KEY
ENV VITE_MAPBOX_STYLE_URL=$VITE_MAPBOX_STYLE_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS production

RUN apk update && apk upgrade

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]