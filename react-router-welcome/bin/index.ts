import express from "express";
import logger from "morgan";
import demo from "../router";

const env = process.env.NODE_ENV || "unknown";

const port = parseInt(process.env.PORT || "3000");

const app = express();

const server = app.listen(port, () => {
  console.log(`server "${env}" listening port ${port}`);
});

app.use(logger("dev"));

app.use("/demo", demo("/demo"));

app.get("/", (req, res) => res.send("Hello World"));
