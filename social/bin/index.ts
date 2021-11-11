import child from "child_process";
import path from "path";
import express from "express";
import { Server as ServerIO } from "socket.io";
import logger from "morgan";
import { Sequelize } from "sequelize";
import { createClient } from "redis";
import social from "../lib";

const port = 3000;

/**
 * Make sure the port is free
 * https://www.npmjs.com/package/kill-port
 */
child.execSync(`kill-port ${port}`);

const build = path.resolve("build");

const app = express();

const server = app.listen(port, () =>
  console.log(`server listen port "${port}".`)
);

const io = new ServerIO(server);

app.use(express.json());

app.use(logger("dev"));

app.use(express.static(build));

const seq = new Sequelize(process.env.DATABASE_URL || "unknwon");

const redis = createClient({ url: process.env.REDIS_URL });

app.use(
  social({
    io,
    seq,
    redis,
    username: "foo",
    password: "12345",
    keyToTokens: "foo",
  })
);

app.get("/", (req, res) => res.redirect("/social/guest"));

app.get("/in-iframe", (req, res) => {
  res.send(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
            </head>
            <body>
              <iframe src="/social/guest/" style="display: none"></iframe>
            </body>
          </html>
  `);
});
