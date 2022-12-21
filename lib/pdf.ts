import express, { NextFunction } from "express";
import { prepareMiddlewarePuppeteer, Req, Res } from "./puppeteer";

export async function createAPIRoute(htmlURL: string) {
    const middlewarePuppeteer = await prepareMiddlewarePuppeteer(htmlURL);
    const apiRoute = express.Router();

    apiRoute.get("/pdf", Example1);
    apiRoute.get("/pdf/react/:foo", Example2);
    apiRoute.use("*", middlewarePuppeteer);

    return apiRoute;
}

export function Example2(req: Req, res: Res, next: NextFunction) {
  req.reportPDF = { template: "react", data: req.params.foo };

  next();
}

export function Example1(req: Req, res: Res, next: NextFunction) {
  req.reportPDF = { template: "react", data: req.query.msg };

  next();
}
