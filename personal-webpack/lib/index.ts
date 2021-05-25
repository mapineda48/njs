import express from "express";
import paths from "./paths";

create.paths = paths;

function create() {
  const router = express.Router();

  router.use(express.static(paths.static));

  router.get("*", (req, res) => {
    res.sendFile(paths.notFound);
  });

  return router;
}

export = create;
