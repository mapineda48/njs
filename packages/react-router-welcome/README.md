# Expressjs - React - Router - Server Side Render - Welcome

Live demo [here](https://apinedavegamiguel.herokuapp.com/demos/react/router-welcome/).

## Configuring npm

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."

```
//registry.npmjs.org/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@mapineda48:registry=https://npm.pkg.github.com/
```
## Installation

`$ npm install @mapineda48/react-router-welcome`

## Usage

```js
const express = require("express");
const demo = require("@mapineda48/react-router-welcome");

const app = express();

app.use(demo());
```

## License

MIT

**Free Software, Hell Yeah!**

## Disclaimer

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
