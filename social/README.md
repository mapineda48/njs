# Social.

## Package

Install nodejs [package](https://docs.npmjs.com/cli/v7/commands/npm-install) with [express router](https://github.com/expressjs/express) for integration with your application.

### Configuring npm

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."

```
//registry.npmjs.org/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@mapineda48:registry=https://npm.pkg.github.com/
```

### Usage

```js
const http = require("http");
const express = require("express");
const social = require("@mapineda48/social").default;
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

/**
 * Important this middleware
 * http://expressjs.com/en/api.html#express.json
 */
app.use(express.json());

/**
 * Demo
 */
app.use(social("foo", "12345", io));
```

## License

MIT

**Free Software, Hell Yeah!**

## Disclaimer

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
