import * as child from "child_process";
import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import { Server as ServerIO } from "socket.io";
import { createApi as social } from "../lib";

const port = 3000;

/**
 * Make sure the port is free
 * https://www.npmjs.com/package/kill-port
 */
child.execSync(`kill-port ${port}`);

const index = path.resolve("bin/index.html");

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

app.get("/", (req, res) => res.sendFile(index));
