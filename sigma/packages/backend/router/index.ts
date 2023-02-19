import express from "express";
import reactApp from "./react-app";
import api from "./api";

export default function appRouter(buildPath?: string) {
  const router = express.Router();

  if (buildPath) {
    router.use(reactApp(buildPath));
  }

  router.use(api());

  return router;
}
