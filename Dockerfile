# syntax=docker/dockerfile:1
# semaje-web: static build served by nginx, proxying /api and /ws to the API.
#   docker run -p 8080:80 -e SEMAJE_API_UPSTREAM=api.internal:3001 ghcr.io/semajehq/semaje-web:2.0.0
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
ARG VITE_AUTH_MODE=single-user
ENV VITE_AUTH_MODE=$VITE_AUTH_MODE
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
ENV SEMAJE_API_UPSTREAM=api:3001 \
    SEMAJE_RESOLVER=127.0.0.11 \
    SEMAJE_MAX_UPLOAD=2048m
HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
