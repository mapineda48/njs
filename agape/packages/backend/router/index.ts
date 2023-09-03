import express from "express";
import reactApp from "./react-app";
import initApis from "./api";
import jwt from "./authenticate/verify";
import { errorMiddleware } from "./error";

export default function appRouter(buildPath?: string) {
  const route = express.Router();

  route.use(jwt());

  initApis(route)
    .then(() => route.use(errorMiddleware))
    .catch((err) => {
      throw err;
    });

  return route;
}
