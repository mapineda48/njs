import express from "express";
import logger from "morgan";
import router from "../router";

const port = 3000;

const app = express();

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(logger("dev"));

app.use(router());

