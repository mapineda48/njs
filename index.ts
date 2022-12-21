import express from "express";
import logger from "morgan";
import path from "path";
import { createAPIRoute } from "./lib/pdf";
import { createReactAppRoute } from "./lib/react";

const port = 3000;

const buildReactPath = path.join(__dirname, "build");

const buildReactRoute = "/app/react/pdf/template";
const htmlReport = `http://localhost:${port}`+ buildReactRoute + "/index.html";

const app = express();

app.use(logger("dev"));

(async function main() {
  app.use(await createReactAppRoute(buildReactPath, buildReactRoute));

  const route = await createAPIRoute(htmlReport);

  app.use("/api", route);

  app.listen(3000, () => {
    console.log("server on port 3000");
  });
})().catch(console.error);
