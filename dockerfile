# Use the official Node.js image as a base
FROM node:16.12.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 to the outside world 
# EXPOSE 3001
 
# Command to run the application
# CMD ["npm", "start"]    
CMD ["node", "server.js"]
  