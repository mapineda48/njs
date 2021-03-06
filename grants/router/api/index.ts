import express from "express";
import { search, getDetail } from "../grants";
import { state } from "../../lib/state";
import { api } from "../../src/shared";
import { prepareRoute } from "../util";
import { handlerError } from "../error";

const route = prepareRoute(api);

export default function create() {
  const router = express.Router();

  router.get(route.state, (req, res) => {
    try {
      const init = state.get(req.query.id);

      res.json(init);
    } catch (error) {
      const [code, data] = handlerError(error);

      res.status(code).json(data);
    }
  });

  router.get(route.state + "/size", (req, res) => {
    const size = state.size();

    res.json({ size });
  });

  router.get(route.state + "/clear", (req, res) => {
    state.clear();
    res.json({ message: "state cache cleared." });
  });

  router.post(route.opportunity, async (req, res, next) => {
    try {
      const startRecordNum = checkNumber(req.body.startRecordNum);

      await search(startRecordNum, res);
    } catch (error) {
      const [code, data] = handlerError(error);

      res.status(code).json(data);
    }
  });

  router.post(route.detail, async (req, res, next) => {
    try {
      const id = checkNumber(req.body.id);

      await getDetail(id, res);
    } catch (error) {
      const [code, data] = handlerError(error);

      res.status(code).json(data);
    }
  });

  return router;
}

function checkNumber(value?: any) {
  if (value === undefined) {
    throw new Error("missing number");
  }

  const number = parseInt(value);

  if (isNaN(number)) {
    throw new Error("invalid number");
  }

  return number;
}
