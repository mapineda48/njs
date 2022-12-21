import express from "express";
import { Req } from "./puppeteer";

export function createReportAPIRoute() {
  const route = express.Router();

  route.get("/pdf", (req: Req, res, next) => {
    req.reportPDF = { template: "react", data: req.query.msg };

    next();
  });

  route.get("/pdf/react/:foo", (req: Req, res, next) => {
    req.reportPDF = { template: "react", data: req.params.foo };

    next();
  });
}
