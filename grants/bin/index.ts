import { createServer } from "./app";
import demo from "../router";

const { app } = createServer();

app.use("/demo", demo("/demo"));

app.get("/", (req, res) => res.send("Hello World"));
