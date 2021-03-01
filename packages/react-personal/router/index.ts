import path from "path";
import express from "express";
import { api } from "../src/admin/shared";
import createSocket from "./socket";
import { state, setMaps } from "./state";
import type { Server as Socket } from "socket.io";

const build = path.join(__dirname, "..", "build");

const _api = `/${api}`;

function handlerError(error: any) {
  console.log(error);

  return { message: "unhandler error" };
}

function main(io: Socket) {
  const router = express.Router();

  const socket = createSocket(io);

  router.get(/.*?\.map$/i, (req, res, next) => {
    if (!state.maps) return res.send("unauthorized");
    next();
  });

  router.put(_api, (req, res) => {
    try {
      const data = req.body;

      const state = setMaps(data.state, socket.change);

      socket.change(state);

      res.json({ message: "success" });
    } catch (error) {
      res.status(500).json(handlerError(error));
    }
  });

  router.get(_api, (req, res, next) => {
    try {
      const { query } = req as any;

      if (query.state) return res.json(state);

      next();
    } catch (error) {
      res.status(500).json(handlerError(error));
    }
  });

  router.use(express.static(build));

  return router;
}

export = main;
