import express from "express";
import { errorMiddleware, parseQueryMiddleware } from "./middleware";
import users from "./user";
import { apiPath } from "../../../integration";

const baseURL = apiPath.protected.model.baseURL;

export default function createModelAPI() {
  const router = express.Router();

  router.use(baseURL, parseQueryMiddleware);
  router.use(users());
  router.use(baseURL, errorMiddleware);

  return router;
}
