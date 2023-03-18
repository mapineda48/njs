import express from "express";
import { errorMiddleware } from "./middleware";
import users from "./user";
import { baseURL } from "../../../integration/sequelize";

export default function createModelAPI() {
  const router = express.Router();

  router.use(users());
  router.use(baseURL, errorMiddleware);

  return router;
}
