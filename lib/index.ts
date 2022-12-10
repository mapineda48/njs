import express from "express";
import logger from "morgan";
import helmet from "helmet";
import { Pool } from "pg";
import { Sequelize } from "sequelize";
import { Server as ServerIO } from "socket.io";
import social from "@mapineda48/social";
import personl, { pages } from "@mapineda48/personal";
import apiRest from "@mapineda48/demos-api-rest";
import sigma from "@mapineda48/demos-sigma";
import grants from "@mapineda48/demos-grants";

const isDev = process.env.NODE_ENV !== "production";

export default function main(config: Setting) {
  const { io, pg, seq, username, password, host } = config;

  const app = express.Router();

  if (isDev) {
    app.use(logger("dev"));
  }

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          frameSrc: ["'self'"],
        },
      },
    })
  );

  app.use(express.json());

  app.use(
    social({
      io,
      seq: seq,
      username,
      password,
    })
  );

  app.use(personl());

  app.use(grants());

  app.use(
    apiRest({
      host,
      sequelize: seq,
    })
  );

  app.use(sigma(pg));

  setTimeout(() => {
    app.get("*", (req, res) => res.sendFile(pages.notfound));
  }, 5000);

  return app;
}

/**
 * Types
 */

interface Setting {
  io: ServerIO;
  pg: Pool;
  seq: Sequelize;
  username: string;
  password: string;
  host: string;
}
