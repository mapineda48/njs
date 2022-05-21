import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { Server as ServerIO } from "socket.io";
import { Pool } from "pg";
import social from "@mapineda48/social";
import sigma from "@mapineda48/demos-sigma";
import personal from "../lib";

const env = process.env.NODE_ENV || "unknown";

const port = parseInt(process.env.PORT || "3000");

const app = express();

const server = app.listen(port, () => {
  console.log(`server "${env}" listening port ${port}`);
});

// const io = new ServerIO(server);

// const pg = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

app.use(express.json());

app.use(logger("dev"));

// app.use(
//   social({
//     io,
//     keyToTokens: "12345",
//     password: "12345",
//     username: "foo",
//     pg,
//   })
// );

app.use(personal());

//app.use(sigma(pg));
