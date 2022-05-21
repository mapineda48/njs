# Personal Web Site

> Expressjs route.

## Configuring npm

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."

```
//registry.npmjs.org/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@mapineda48:registry=https://npm.pkg.github.com/
```

## Installation

`$ npm install @mapineda48/personal`

## Usage

```js
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { createRouter } = require("@mapineda48/personal");

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

/**
 * Important this middleware
 * http://expressjs.com/en/api.html#express.json
 */
app.use(express.json());

app.use(createRouter({ io: socket, username: "foo", password: "12345" }));
```

## License

MIT

**Free Software, Hell Yeah!**

## Disclaimer

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
