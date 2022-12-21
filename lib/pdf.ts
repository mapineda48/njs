import express, { NextFunction } from "express";
import { prepareMiddlewarePuppeteer, Req, Res } from "./puppeteer";
import { setBaseURLHtml } from "./react";

export async function pdfRoute(
  buildPath: string,
  buildRoute: string,
  port: number
) {
  const host = `http://localhost:${port}`;
  const htmlRoute = buildRoute + "/index.html";
  const baseURL = host + buildRoute;
  const htmlURL = host + htmlRoute;

  const reactAppHtml = await setBaseURLHtml(buildPath, baseURL);
  const middlewarePuppeteer = await prepareMiddlewarePuppeteer(htmlURL);

  const route = express.Router();

  route.get(htmlRoute, (req, res) => res.send(reactAppHtml));
  route.use(buildRoute, express.static(buildPath));

  route.get("/pdf", Example1);
  route.get("/pdf/react/:foo", Example2);

  route.use("*", middlewarePuppeteer);

  return route;
}

export function Example2(req: Req, res: Res, next: NextFunction) {
  req.reportPDF = { template: "react", data: req.params.foo };

  next();
}

export function Example1(req: Req, res: Res, next: NextFunction) {
  req.reportPDF = { template: "react", data: req.query.msg };

  next();
}
