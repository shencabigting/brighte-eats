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
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
