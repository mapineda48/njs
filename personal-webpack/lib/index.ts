import * as express from "express";
import { src as paths } from "./paths";

export function createRouter() {
  const router = express.Router();

  router.use(express.static(paths.static));

  router.get("*", (req, res) => {
    res.sendFile(paths.notFound);
  });

  return router;
}
