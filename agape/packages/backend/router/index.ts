import express from "express";
import reactApp from "./react-app";
import initApis from "./api";
import { createApiModels } from "./model";
import { errorMiddleware } from "./error";
import verifyJwt from "./authenticate";

export default function appRouter(buildPath?: string) {
  const router = express.Router();

  initApis().then((agape) => {
    if (buildPath) {
      router.use(reactApp(buildPath));
    }

    router.use(verifyJwt());
    router.use(createApiModels());
    router.use(agape);

    router.use(errorMiddleware);
  });

  return router;
}
