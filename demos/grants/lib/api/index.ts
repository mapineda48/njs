import express from "express";
import { search, getDetail } from "../grants";
import { api as rApi } from "../type";
import Error, { middleErr } from "../error";
import { prepare } from "./util";

const api = prepare(rApi);

export default function create() {
  const router = express.Router();

  router.get(api.opportunity, async (req, res, next) => {
    try {
      const { startRecordNum } = req.query;

      if (!startRecordNum) {
        throw new Error(404, "missing start record num");
      }

      const normal = parseInt(startRecordNum + "");

      if (isNaN(normal)) {
        throw new Error(404, `invalid start record num "${startRecordNum}"`);
      }

      await search(normal, res);
    } catch (error) {
      next(error);
    }
  });

  router.get(api.detail, async (req, res, next) => {
    try {
      const { id } = req.query;

      if (!id) {
        throw new Error(404, "missing id detail");
      }

      const normal = parseInt(id + "");

      if (isNaN(normal)) {
        throw new Error(404, `invalid id "${id}"`);
      }

      await getDetail(normal, res);
    } catch (error) {
      next(error);
    }
  });

  router.use(middleErr);

  return router;
}
