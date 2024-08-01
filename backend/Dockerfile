# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 5000

# Start the app
CMD ["npm", "run", "start:prod"]
