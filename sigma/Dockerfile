########################################## Builder ########################################
FROM node:16 AS builder

ENV GENERATE_SOURCEMAP 'false'

# Create app directory
WORKDIR /usr/src/builder

COPY . .

RUN yarn install && yarn build

######################################### Production #######################################
FROM node:16-alpine

ENV NODE_ENV 'production'

WORKDIR /home/app

RUN adduser --disabled-password --home /home/app --gecos '' app \
  && chown -R app /home/app

USER app

COPY --from=builder /usr/src/builder/dist .

RUN npm install

CMD [ "npm", "start" ]