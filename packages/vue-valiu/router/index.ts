import path from "path";
import express from "express";
import createModel from "./model";
import createIo from "./socket";
import { Pool } from "pg";
import { Server as Socket } from "socket.io";
import { api as url } from "../src/shared";

const build = path.join(__dirname, "..", "build");

const api = "/" + url;

function handlerError(res: Res, error: any) {
  console.log(error);

  switch (error.code) {
    case "23505":
      res.status(400).json({ message: "La Etiqueta ya existe" });
      return;

    case "ECONNREFUSED":
      res.status(500).json({ message: "fail connect DB" });
      return;

    default:
      res.status(500).send("unhandler error server");
      return;
  }
}

function create(pg: Pool, socket: Socket) {
  const router = express.Router();

  const model = createModel(pg);

  const io = createIo(socket);

  router.use(express.static(build));

  router.get(api, async (req, res) => {
    try {
      const tags = await model.select();

      res.json(tags);
    } catch (error) {
      handlerError(res, error);
    }
  });

  router.post(api, async (req, res) => {
    try {
      const tag = req.body;

      const current = await model.insert(tag);

      res.json({ message: "Etiqueta Inserta" });

      io.insert(current);
    } catch (error) {
      handlerError(res, error);
    }
  });

  router.put(api, async (req, res) => {
    try {
      const tag = req.body;

      const current = await model.update(tag);

      res.json({ message: "Etiqueta Actualizada" });

      io.update(current);
    } catch (error) {
      handlerError(res, error);
    }
  });

  router.delete(api + "/:id", async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: "missing id tag" });
      }

      const current = await model.delete(parseInt(id));

      res.json({ message: "Etiqueta Eliminada" });

      io.delete(current);
    } catch (error) {
      handlerError(res, error);
    }
  });

  return router;
}

export = create;

/**
 * Types
 */

type Res = express.Response;
