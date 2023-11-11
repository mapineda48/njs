########################################## Builder ########################################
FROM node:20 AS builder

# Create app directory
WORKDIR /usr/src/builder

ENV DATABASE_URL 'postgresql://postgres:mypassword@db'
ENV STORAGE_URL 'http://minio:minio123@minio:9000'

COPY . .

RUN yarn install && yarn build

######################################### Production #######################################
FROM node:20-alpine

ENV NODE_ENV 'production'

WORKDIR /home/app

RUN adduser --disabled-password --home /home/app --gecos '' app \
  && chown -R app /home/app

USER app

COPY --from=builder /usr/src/builder/dist .

RUN npm install

CMD [ "npm", "start" ]