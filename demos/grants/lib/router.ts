import path from "path";
import express from "express";
import { render } from "./worker";
import { fetchOpportunitys, fetchDetail } from "./grants";
import { route, go, Opportunity, Detail, title } from "./type";
import { getPagination } from "../frontend/src/Opportunity/pagination";
import { resolve } from "./paths";
import api from "./api";
import Error, { middleErr } from "./error";
import baseUrl from "./baseUrl";
import { clean as cleanCache, isOverload } from "./ssr/cache";

const build = resolve("frontend/build");

export const home = path.join(baseUrl, go.opportunity(1));

export function createDemo() {
  const router = express.Router();

  router.get(["/", "/index.html"], (req, res) => res.redirect(home));

  /**
   * Try to prevent a malicious person from overloading the disk
   */
  router.get(Object.values(route), async (req, res, next) => {
    const notContinue = await isOverload();

    if (notContinue) {
      res
        .status(500)
        .send("Ups... something wrong, wait a seconds and try again.");
      return;
    }

    next();
  });

  router.use("/state/*.json", (req, res, next) => {
    const state = path.basename(req.originalUrl);

    res.on("close", () => cleanCache(state));

    next();
  });

  router.use(express.static(build));

  router.get(route.about, async (req, res, next) => {
    try {
      const html = await render(req.url, undefined, title.about());

      res.send(html);
    } catch (error) {
      next(error);
    }
  });

  router.get(route.opportunity, async (req, res, next) => {
    try {
      const { page } = req.params;

      const normal = parseInt(page);

      if (isNaN(normal)) {
        res.redirect(home);
        return;
      }

      const data = await fetchOpportunitys(normal);

      const state: Opportunity = {
        type: "Opportunity",
        state: {
          data: {
            [normal]: data,
          },
          pagination: getPagination(normal),
        },
      };

      const html = await render(req.url, state, title.opportunity(normal));

      res.send(html);
    } catch (error: any) {
      next(error);
    }
  });

  router.use(route.detail, async (req, res, next) => {
    try {
      const { id } = req.params;

      const normal = parseInt(id);

      if (isNaN(normal)) {
        res.redirect(home);
        return;
      }

      const data = await fetchDetail(normal);

      const state: Detail = {
        type: "Detail",
        state: {
          data: {
            [normal]: data,
          },
        },
      };

      const html = await render(req.url, state, title.detail(normal));

      res.send(html);
    } catch (error) {
      next(error);
    }
  });

  router.use(api());

  router.use(middleErr);

  return router;
}
