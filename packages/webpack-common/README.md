# Expressjs - Webpack - Common

## Configuring npm

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."

```
//registry.npmjs.org/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@mapineda48:registry=https://npm.pkg.github.com/
```
## Installation

`$ npm install @mapineda48/webpack-common`

**Install peer dependencies**

## Usage

```js
const express = require("express");
const demo = require("@mapineda48/react-welcome");

const app = express();

app.use(demo());
```

## Environment development

- Debian GNU/Linux 10 (buster)
- Nodejs v12.18.3
- yarn v1.22.5
- VSCode v1.48.2

## License

MIT

**Free Software, Hell Yeah!**
