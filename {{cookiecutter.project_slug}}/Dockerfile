# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:20.16.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
COPY . .

# install node modules and build assets
# RUN npm install -g npm@8.7.0
RUN npm i
RUN npm run build

# nginx state for serving content
FROM nginx:stable-alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/dist/{{ cookiecutter.project_slug }}/browser .
# Copy default.conf to nginx
COPY default.conf /etc/nginx/conf.d

EXPOSE 80
