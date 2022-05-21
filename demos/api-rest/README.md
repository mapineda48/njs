# Api - Rest

This module contains the API Rest that I developed, the purpose of this is only to put into practice what I have learned, always seeking to follow the standards of the industry, in addition to serving the data consumed by some demos web app that I expose on [site](https://apinedavegamiguel.herokuapp.com).

## Usage

```js
const express = require("express");
const { Sequelize } = require("sequelize");
const demos = require("@mapineda48/demos-api-react");

const app = express();

// Dont forget parse json
app.use(express.json());


// must be used postgres
const sequelize = new Sequelize("postgres://postgres:12345@/postgres"); 


app.use(
  demo({
    host: "http://apinedavegamiguel.herokuapp.com",
    sequelize,
  })
);

```

## External Documentation
