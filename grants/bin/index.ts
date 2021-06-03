import { createServer } from "./app";
import { createRouter } from "../lib";

const { app } = createServer();

app.use("/demo", createRouter("/demo"));

app.get("/", (req, res) => res.send("Hello World"));
