# Use Node.js as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
