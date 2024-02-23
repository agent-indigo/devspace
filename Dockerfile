# Use official Node.js image as the base image
FROM node:iron

# Set the working directory inside the container
WORKDIR /app

# Copy application code to working directory
COPY . /app/

# Install dependencies
RUN npm install

# Build the Next.js app
RUN npm run build

# Expose the port Next.js is running on
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "start"]
