import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { Sequelize } from "sequelize";
import demo from "../lib";
import baseUrl from "../lib/baseUrl";

const port = process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(helmet());

app.use(express.json());

app.use(logger("dev"));

const sequelize = new Sequelize(process.env.DATABASE_URL || "", {
  dialect: "postgres",
}); // Example for postgres

app.get("/", (req, res) => res.redirect(baseUrl));

app.use(
  demo({
    host: process.env.HOST || "",
    sequelize,
  })
);
