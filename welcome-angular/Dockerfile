# https://hub.docker.com/_/node
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# https://docs.docker.com/develop/develop-images/multistage-build/#name-your-build-stages

#
# Builder
#
FROM node:14 AS builder

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies and Build source
RUN yarn install && yarn build:to:docker

#
# App
#
FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist .

RUN npm install

CMD [ "npm", "start" ]