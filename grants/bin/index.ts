import { createServer } from "./app";
import demo from "../router";

const { app } = createServer();

app.use(demo());

app.get("/", (req, res) => res.send("Hello World"));
