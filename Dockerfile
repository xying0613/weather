# ================================
# Stage 1: Build the React app
# ================================
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the production app
RUN npm run build

# ================================
# Stage 2: Serve the app with Nginx
# ================================
FROM nginx:alpine AS production

# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
