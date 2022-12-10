# Personal Web Server

## Heroku

Configure the client by heroku command line and access with your credentials, follow this [tutorial](https://devcenter.heroku.com/articles/heroku-cli).

## Github npm registry

This project has private packages that are available only in [github npm registry](https://docs.github.com/es/packages/working-with-a-github-packages-registry/working-with-the-npm-registry), you must create an access token in github, and set an environment variable with it called `GITHUB_TOKEN` so that the project can download these packages, private packages are the ones that are find in the scoped **@mapineda48/\***.
