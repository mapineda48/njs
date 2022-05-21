import express from "express";
import logger from "morgan";
import { Sequelize } from "sequelize";
import sigma from "../lib";
import route from "../lib/baseUrl";

process.on("unhandledRejection", (err) => {
  console.error(err);
});

const port = 4000;

const seq = new Sequelize(process.env.DATABASE_URL || "missing uri");

const app = express();

app.listen(port, () => {
  console.log(`server "${process.env.NODE_ENV}" running in port ${port}`);
});

app.use(express.json());

app.use(logger("dev"));

app.get("/", (req, res) => res.redirect(route));

app.use(sigma(seq));
