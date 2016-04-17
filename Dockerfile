FROM node:4

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
RUN npm install -g bower
RUN npm install

# Bundle app source
RUN bower install --allow-root

EXPOSE 8080
CMD [ "npm", "start" ]