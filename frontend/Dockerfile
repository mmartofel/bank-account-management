# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@latest
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using nginx
FROM nginx:alpine

# Switch to root to modify permissions
USER root

# Create required directories and set permissions
RUN mkdir -p /var/cache/nginx \
    /var/run \
    /var/log/nginx \
    /var/lib/nginx && \
    chmod -R g+rwx /var/cache/nginx \
    /var/run \
    /var/log/nginx \
    /var/lib/nginx && \
    chmod -R g+rwx /etc/nginx && \
    chgrp -R 0 /var/cache/nginx \
    /var/run \
    /var/log/nginx \
    /var/lib/nginx \
    /etc/nginx

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod g+rw /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html
RUN chmod -R g+rw /usr/share/nginx/html

# Expose port 8080 (OpenShift preferred)
EXPOSE 8080

# Switch to non-root user
USER 1001

# Run nginx in non-daemon mode
CMD ["nginx", "-g", "daemon off;"]
