import express from "express";
import logger from "morgan";

export function createServer() {
  const env = process.env.NODE_ENV || "unknown";

  const port = parseInt(process.env.PORT || "3000");

  const app = express();

  const server = app.listen(port, () => {
    console.log(`server "${env}" listening port ${port}`);
  });

  app.use(logger("dev"));

  app.use(express.json());

  return { server, app };
}
