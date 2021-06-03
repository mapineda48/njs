import * as path from "path";
import * as express from "express";
import { handerError } from "./error";
import { JWT, Auth } from "./token";
import { createState } from "./state";
import { createSocket } from "./socket";
import { api, FORCE_OPEN, HEADERTOKEN } from "../src/app/service";

import type { Server as Io } from "socket.io";
import type { DataRoom, DataMessage, ResRooms } from "../src/app/service";

const build = path.join(__dirname, "..", "build");

export function createRouter({ io, ...auth }: Options) {
  const state = createState();

  const jwt = new JWT(auth);

  const socket = createSocket(state, jwt, io);

  const router = express.Router();

  router.post(api.addMessage, (req, res) => {
    const data: DataMessage = req.body;

    socket.addMessageGuess(data);

    if (data.message.content !== FORCE_OPEN) {
      socket.addMessageAdmin(data);
    }

    res.end();
  });

  router.get(api.online, (req, res) => {
    res.json({ online: state.getOnline() });

    const data: DataRoom = req.query as any;

    state.addRoom(data);

    socket.addRoom(data);
  });

  /**
   * Admin Auth
   */
  router.get(api.getRooms, (req, res) => {
    try {
      const token = req.headers[HEADERTOKEN] as string;

      jwt.check(token);

      const data: ResRooms = {
        rooms: state.getRooms(),
      };

      res.json(data);
    } catch (error) {
      const [code, data] = handerError(error);

      res.status(code).json(data);
    }
  });

  router.post(api.login, async (req, res) => {
    try {
      const token = await jwt.sigin(req.body);

      res.json({ token });

      socket.setOnlineAdmin();
    } catch (error) {
      const [code, data] = handerError(error);

      res.status(code).json(data);
    }
  });

  router.use(express.static(build));

  return router;
};

/**
 * Types
 */
export interface Options extends Auth {
  io: Io;
}
