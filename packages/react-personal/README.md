# Expressjs - React - Page Personal

[Personal Web Site](https://apinedavegamiguel.herokuapp.com/).

## Configuring npm

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."

```
//registry.npmjs.org/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@mapineda48:registry=https://npm.pkg.github.com/
```
## Installation

`$ npm install @mapineda48/react-personal`

## Usage

```js
const express = require("express");
const socket = require("socket.io");
const demo = require("@mapineda48/react-personal");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(demo(io));
```

## License

MIT

**Free Software, Hell Yeah!**

## Disclaimer

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
