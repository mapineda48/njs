import express from "express";
import logger from "morgan";
import personal from "../lib";

const port = 3000;

const app = express();

app.use(logger("dev"));

app.use(personal());

app.listen(port, () => console.log(`listening on port ${3000}`));
