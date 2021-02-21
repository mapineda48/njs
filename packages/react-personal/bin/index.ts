import express from "express";
import logger from "morgan";
import { Server as Socket } from "socket.io";
import router from "../router";

const port = 3000;

const app = express();

const http = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const socket = new Socket(http);

app.use(express.json());

app.use(logger("dev"));

app.use(router(socket));
