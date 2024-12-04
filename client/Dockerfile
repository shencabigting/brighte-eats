# Use official Node.js image for building the React frontend
FROM node:20-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY package*.json .
# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the application port
# EXPOSE 3000

# Start React app
# CMD ["npm", "start"]

# Build the app for production
RUN npm run build

# Install a lightweight web server to serve the build
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage
COPY --from=frontend-build /app/client/build /usr/share/nginx/html

# Expose port 80 for the NGINX server
# React frontend will be served via Nginx on port 80
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
