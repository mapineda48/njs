import express from "express";
import reactApp from "./react-app";
import { createApi } from "./agape";
import { createApiModels } from "./model";
import { errorMiddleware } from "./error";

export default function appRouter(buildPath?: string) {
  const router = express.Router();

  createApi().then((agape) => {
    if (buildPath) {
      router.use(reactApp(buildPath));
    }

    router.use(createApiModels());
    router.use(agape);
    
    router.use(errorMiddleware);
  });

  return router;
}
