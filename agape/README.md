# agape

As a seller after promoting new ones through social media, you can
now manage all registered users to access the new product review
before anyone else

# Usage

## docker-compose

This demo has a [container](https://hub.docker.com/r/mapineda48/agape) available in [dockerhub](https://hub.docker.com/), the only thing you should have installed is [docker-compose](https://docs.docker.com/compose/), create a random directory, inside this create a file called `docker-compose.yml` and add the following:

```yml
version: "3.8"
services:
  app:
    container_name: app-agape-demo
    image: mapineda48/agape
    depends_on:
      - db
    environment:
      DATABASE_URL: "postgresql://postgres:mypassword@db"
    ports:
      - "5000:5000"
  db:
    container_name: db-agape-demo
    image: "postgres:14"
    environment:
      POSTGRES_PASSWORD: "mypassword"
```

Now open a terminal and navigate to the directory where you created the file and run:

```sh
docker-compose up
```

Wait a few minutes while the dependencies are downloaded, the services are configured and when you see that the services are ready go to the browser and go to http://localhost:5000

## docker

```sh
docker run \
    --name agape-demo \
    -p 5000:5000 \
    -e "DATABASE_URL=<here your uri postgres connection>" \
    -d \
    mapineda48/agape
```
