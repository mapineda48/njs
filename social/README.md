# Social

Social module that allows me to maintain closer contact with people who visit my website, demos and other sites, you will find my social networks and chat.

## Server

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
const { Server } = require("socket.io");
const { Sequelize } = require("sequelize");
const social = require("@mapineda48/social");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

/**
 * Important this middleware
 * http://expressjs.com/en/api.html#express.json
 */
app.use(express.json());

/*
 * https://sequelize.org/
 */
const seq = new Sequelize(process.env.DATABASE_URL);

/**
 * Demo
 */
app.use(
  social({
    io,
    seq,
    username: "foo",
    password: "12345",
  })
);
```
## Client

To enable the social section on the client side, simply add the following to `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Cool Page</title>
</head>
<body>


    <!-- Just add this script -->
    <script defer src="https://apinedavegamiguel.herokuapp.com/social/static/js/widget.js" app="Foo"></script>
</body>
</html>
```

## Development

I personally use these variables during development, but feel free to adjust them as you see fit.

```sh
INLINE_RUNTIME_CHUNK=false
FAST_REFRESH=false
PORT=3000

# Development

# PUBLIC_URL=http://localhost:3000
# NODE_ENV=development
```


## License

MIT

**Free Software, Hell Yeah!**

## Disclaimer

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
