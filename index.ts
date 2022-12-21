import express from "express";
import logger from "morgan";
import path from "path";
import { createAPIRoute } from "./lib/pdf";
import { createReactAppRoute } from "./lib/react";

const port = 3000;

const buildReactRoute = "/app/react/pdf";
const htmlReactRoute = buildReactRoute + "/index.html";
const buildReactPath = path.join(__dirname, "build");

const hostReport = `http://localhost:${port}`;
const reportBaseURL = hostReport + buildReactRoute;
const reportHtmlURL = hostReport + htmlReactRoute;

const app = express();

app.use(logger("dev"));

(async function main() {
  app.use(
    await createReactAppRoute(reportBaseURL, buildReactPath, buildReactRoute)
  );

  const route = await createAPIRoute(reportHtmlURL);

  app.use("/api", route);

  app.listen(3000, () => {
    console.log("server on port 3000");
  });
})().catch(console.error);
