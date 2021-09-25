import express from "express";
import { resolve } from "./pages";

export const build = resolve("frontend/build");

export function createRouter() {
  const router = express.Router();

  router.use(express.static(build));

  return router;
}
