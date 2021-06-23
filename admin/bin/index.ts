import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import { createRouter } from "../lib";

const devIndex = path.resolve("bin/index.html");

const port = parseInt(process.env.PORT || "3000");

const env = process.env.NODE_ENV || "unknown";

const app = express();

const server = app.listen(port, () =>
  console.log(`server ${env} listening on port ${port}.`)
);

app.use(logger("dev"));

app.use(express.json());

app.get("/", (req, res) => res.sendFile(devIndex));

app.use(createRouter({ user: "foo", password: "12345" }));
