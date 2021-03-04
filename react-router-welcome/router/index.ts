import express from "express";
import { build } from "./paths";
import { render } from "./ssr";
import { loadHTML, injectInHtml } from "./util";
import { routes } from "../src/shared";

export = function create(baseUrl = "/") {
  const router = express.Router();

  loadHTML(baseUrl);

  routes.forEach((route) => {
    router.get(route, (req, res) => {
      const data = render(req.url);

      const html = injectInHtml(data);

      res.send(html);
    });
  });

  router.use(express.static(build));

  router.use("*", (req, res) => res.status(404).send("not found!!!"));

  return router;
};
