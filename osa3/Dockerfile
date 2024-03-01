# This Dockerfile sets up a Node.js environment for running a Node.js application.
# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose port 8080 to allow external connections to the Node.js application
EXPOSE 3001

# Define the command to run the Node.js application
CMD npm start
