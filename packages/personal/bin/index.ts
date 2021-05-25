import express from "express";
import logger from "morgan";
import demo from "../lib";
import { Server as Socket } from "socket.io";

const env = process.env.NODE_ENV || "unknown";

const port = parseInt(process.env.PORT || "3000");

const app = express();

const server = app.listen(port, () => {
  console.log(`server "${env}" listening port ${port}`);
});

const socket = new Socket(server);

app.use(express.json());

app.use(logger("dev"));

app.use(
  demo({
    io: socket,
    username: process.env.PERSONAL_USERNAME || "foo",
    password: process.env.PERSONAL_PASSWORD || "12345",
  })
);

//app.get("/", (req, res) => res.send("Hello World"));
