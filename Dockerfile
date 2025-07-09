# BASE Image
FROM node:latest

# Working Dir
WORKDIR /app

# Copy the dependencies
COPY package*.json /app/

# Install dependencies and libraries
RUN npm install

# Copy the source code
COPY . .

# Start the server
CMD ["node","index.js"]
