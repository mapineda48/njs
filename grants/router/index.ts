import express from "express";
import api from "./api";
import { resolve } from "../lib/paths";
import { loadHtml } from "../lib/html";
import { render } from "../lib/ssr";
import { checkNumber } from "./util";
import { fetchDetail, fetchOpportunitys } from "./grants";
import { route, title, go } from "../src/shared";
import { handlerError } from "./error";

export = function create(baseUrl = "/") {
  const router = express.Router();

  loadHtml(baseUrl);

  router.get("/", (req, res) => res.redirect(go.opportunity("1")));

  router.get(route.about, (req, res) => {
    try {
      const html = render(title.about(), req.url);

      res.send(html);
    } catch (error) {
      const [code, data] = handlerError(error);

      res.status(code).json(data);
    }
  });

  router.get(route.opportunity, async (req, res) => {
    try {
      const key = req.params.page;

      const page = checkNumber(key);

      const data = await fetchOpportunitys(page);

      const html = render(title.opportunity(key), req.url, {
        opportunity: { [key]: data },
      });

      res.send(html);
    } catch (error) {
      const [code, data] = handlerError(error);

      res.status(code).json(data);
    }
  });

  router.get(route.detail, async (req, res) => {
    try {
      const key = req.params.id;

      const id = checkNumber(key);

      const data = await fetchDetail(id);

      const html = render(title.detail(key), req.url, {
        detail: { [key]: data },
      });

      res.send(html);
    } catch (error) {
      const [code, data] = handlerError(error);

      res.status(code).json(data);
    }
  });

  router.use(express.static(resolve("build")));

  router.use(api());

  return router;
};
