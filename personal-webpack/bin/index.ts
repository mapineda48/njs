import express from "express";
import logger from "morgan";
import { createRouter } from "../lib";

const port = 3000;

const app = express();

app.use(logger("dev"));

app.use(createRouter());

app.listen(port, () => console.log(`listening on port ${3000}`));
