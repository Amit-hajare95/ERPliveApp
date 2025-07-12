# erp-app 
# Build environment
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Create public directory and copy necessary files
RUN mkdir -p public && \
    cp index.html public/ && \
    cp app.js public/

# Production environment
FROM nginx:1.24.0-alpine-slim

# Install wget for healthcheck
RUN apk add --no-cache wget

# Nginx config
COPY --from=build /app/public /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Add HEALTHCHECK instruction
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

