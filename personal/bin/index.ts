import * as express from "express";
import * as logger from "morgan";
import { createRouter as personal } from "../lib";

const env = process.env.NODE_ENV || "unknown";

const port = parseInt(process.env.PORT || "3000");

const app = express();

const server = app.listen(port, () => {
  console.log(`server "${env}" listening port ${port}`);
});

app.use(express.json());

app.use(logger("dev"));

app.use(
  personal()
);