# Expressjs - Vue - Valiu

Live demo [here](https://apinedavegamiguel.herokuapp.com/demos/valiu/).

## Configuring npm

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."

```
//registry.npmjs.org/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@mapineda48:registry=https://npm.pkg.github.com/
```

## Installation

`$ npm install @mapineda48/valiu`

**Install peer dependencies**

## Schema

```
$ cd node_modules/@mapineda48/valiu
$ psql postgres://user@host:port

postgres=# \ir sql/index.sql
```

## Usage

```js
const http = require("http");
const express = require("express");
const { Pool } = require("pg");
const socket = require("socket.io");
const valiu = require("@mapineda48/valiu");

const app = express();
const server = http.createServer(app);
const io = socket(server);
const pool = new Pool();

//important
app.use(express.json());

app.use("/my/path", valiu(pool, io));
```

## License

MIT

**Free Software, Hell Yeah!**

## Disclaimer

- This project was bootstrapped with [@vue/cli](https://cli.vuejs.org/guide/installation.html).