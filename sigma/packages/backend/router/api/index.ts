import express from "express";
import createModelAPI from "./model";

export default function createAPI() {
  const router = express.Router();

  router.use(createModelAPI());

  return router;
}