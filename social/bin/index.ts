import child from "child_process";
import path from "path";
import express from "express";
import logger from "morgan";
import { Server as ServerIO } from "socket.io";
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

app.use(social("foo", "12345", io));

app.get("/", (req, res) => res.redirect("/social/guest"));
