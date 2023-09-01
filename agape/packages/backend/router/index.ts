import express from "express";
import reactApp from "./react-app";
import initApis from "./api";
import { createApiModels } from "./model";
import { errorMiddleware } from "./error";
import verifyJwt from "./authenticate";

export default function appRouter(buildPath?: string) {
  const route = express.Router();

  route.use(verifyJwt());
  route.use(createApiModels());

  initApis(route)
    .then(() => route.use(errorMiddleware))
    .catch((err) => {
      throw err;
    });

  return route;
}
