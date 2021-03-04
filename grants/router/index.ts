import path from "path";
import express from "express";
import { search, getDetail } from "./redirect";
import { message } from "../src/shared";

const build = path.join(__dirname, "..", "build");

function checkNumber(value?: any) {
  if (value === undefined) {
    return { number: 0, error: "missing number" };
  }

  const number = parseInt(value);

  if (isNaN(number)) {
    return { number, error: "invalid number" };
  }

  return { number };
}

function unHandlerError(err: any) {
  console.log(err);

  return { message: "Internal Server Error" };
}

function api() {
  const router = express.Router();

  const url = {
    search: "/api/rest/search",
    details: "/api/rest/detail",
  };

  router.post(url.search, async (req, res, next) => {
    try {
      const { startRecordNum } = req.body;

      const { number, error } = checkNumber(startRecordNum);

      if (error) return res.status(400).json(error);

      await search(number, res);
    } catch (error) {
      res.status(500).json(unHandlerError(error));
    }
  });

  router.post(url.details, async (req, res, next) => {
    try {
      const { id } = req.body;

      const { number, error } = checkNumber(id);

      if (error) return res.status(400).json(error);

      await getDetail(number, res);
    } catch (error) {
      res.status(500).json(unHandlerError(error));
    }
  });

  return router;
}

function app() {
  const router = express.Router();

  router.use(express.static(build));

  return router;
}

export = function create() {
  const router = express.Router();

  router.use(app());
  router.use(api());

  return router;
};
