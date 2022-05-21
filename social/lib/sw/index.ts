import express from "express";
import { MIGUEL_ROUTE, MIGUEL_SCOPE } from "./type";

const HEADER_WORKER_SCOPE = "Service-Worker-Allowed";
/**
 * https://medium.com/dev-channel/two-http-headers-related-to-service-workers-you-never-may-have-heard-of-c8862f76cc60#:~:text=This%20is%20where%20finally%20the,header's%20section%20in%20the%20spec.
 * https://stackoverflow.com/questions/29874068/navigator-serviceworker-is-never-ready
 * https://developer.mozilla.org/es/docs/Web/API/ServiceWorkerContainer/register
 */

export default function middlewareWorkers() {
  const route = express.Router();

  route.get(MIGUEL_ROUTE, (req, res, next) => {
    res.header(HEADER_WORKER_SCOPE, MIGUEL_SCOPE);
    next();
  });

  return route;
}
