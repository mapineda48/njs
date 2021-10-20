import path from "path";
import child from "child_process";
import cluster from "cluster";
import os from "os";
import http from "http";
import express from "express";
import { Server as ServerIO } from "socket.io";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import logger from "morgan";
import { Pool } from "pg";
import social from "../lib";
import { NAMESPACE } from "../lib/socket/type";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { setupMaster, setupWorker } = require("@socket.io/sticky");

const port = 3000;

const build = path.resolve("build");

/**
 * Make sure the port is free
 * https://www.npmjs.com/package/kill-port
 */
//child.execSync(`kill-port ${port}`);

/**
 * https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html
 */
const totalCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  const server = http.createServer();

  // setup sticky sessions
  setupMaster(server, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  // Node.js < 16.0.0
  // cluster.setupMaster({
  //   serialization: "advanced",
  // });
  // Node.js > 16.0.0
  // cluster.setupPrimary({
  //   serialization: "advanced",
  // });

  server.listen(port, () => {
    console.log(`Server listening port ${port}`);
  });

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const app = express();

  const server = http.createServer(app);

  const io = new ServerIO(server);

  io.of(NAMESPACE).on("connect", () => {
    console.log("Worker Socket: " + process.pid);
  });

  // use the cluster adapter
  io.adapter(createAdapter());

  // setup connection with the primary process
  setupWorker(io);

  // app.use("*", (req, res, next) => {
  //   console.log(`PID: ${process.pid}`);

  //   next();
  // });

  app.use("*", (req, res, next) => {
    console.log("Worker: " + process.pid);
    next();
  });

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
}
