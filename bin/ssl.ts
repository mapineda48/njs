import fs from "fs";
import path from "path";
import https from "https";
import express from "express";
import { Server as Socket } from "socket.io";
import prepare, { getFromEnv } from "../lib";

const key = fs.readFileSync(path.resolve("certs/key.pem"));
const cert = fs.readFileSync(path.resolve("certs/cert.pem"));

const port = getFromEnv("PORT");

const app = express();

const server = https.createServer({ key, cert }, app);

const io = new Socket(server);

prepare(app, io);

server.listen(port, () => {
  console.log("listening on port 3000");
});
