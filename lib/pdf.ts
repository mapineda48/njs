import express from "express";
import { prepareMiddlewarePuppeteer } from "./puppeteer";
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

  route.use("*", middlewarePuppeteer);

  return route;
}
