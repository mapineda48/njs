import express from "express";
import { Sequelize } from "sequelize";
import { Server as ServerIO } from "socket.io";
import helmet from "helmet";
import logger from "morgan";
import social from "../lib";

const root = process.cwd();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const seq = new Sequelize(process.env.DATABASE_URL || "unknwon");

const app = express();

const startLog = () => console.log(`server listen port "${port}".`);

const io = new ServerIO(app.listen(port, startLog));

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        upgradeInsecureRequests: null,
      },
    },
  })
);

app.use(express.json());

app.use(logger("dev"));

app.use(
  social({
    username: "foo",
    password: "12345",
    seq,
    io,
  })
);

app.get("/", (req, res) => res.sendFile("frontend/_dev_/index.html", { root }));

app.get("/widget.html", (req, res) =>
  res.sendFile("frontend/_dev_/widget.html", { root })
);
