FROM node:lts-alpine

# Create app directory
RUN mkdir /app

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install --silent
# If you are building your code for production
# RUN npm ci --only=production

# Copy the contents of the project to the image
COPY . .

# Exposed port where the app will work
EXPOSE $PORT

# Run 'npm start' when the container starts.
CMD [ "node", "src/app.js" ]