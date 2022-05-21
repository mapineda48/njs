import path from "path";
import express from "express";
import logger from "morgan";
import grants from "../lib";
import { home } from "../lib/router";

const app = express();

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.redirect(home);
});

app.use(express.json());

app.use(grants());

app.listen(3000, () => {
  console.log("listing");
});
