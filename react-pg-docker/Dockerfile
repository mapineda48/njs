# https://hub.docker.com/_/node
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies and Build source
RUN yarn install && yarn build

ENV NODE_ENV=production

CMD [ "node", "dist/bin/index.js" ]