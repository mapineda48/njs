import child from "child_process";
import path from "path";
import express from "express";
import logger from "morgan";
import { Server as ServerIO } from "socket.io";
import { Pool } from "pg";
import social from "../lib";
import { prepareToSend } from "../lib/web-push";
import initStore from "../lib/store";

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

const pg = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(
  social({
    io,
    keyToTokens: "foo",
    username: "foo",
    password: "12345",
    pg,
  })
);

app.get("/", (req, res) => res.redirect("/social/guest"));

const sendNotify = prepareToSend(initStore(pg));

process.stdin.on("data", (buff) => {
  const [title, body] = buff.toString().replace(/\n/, "").split(" ");

  sendNotify({ title, body }).catch(console.error);
});
