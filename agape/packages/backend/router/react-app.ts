import express from "express";

export default function reactApp(buildPath: string) {
  const router = express.Router();

  router.use(express.static(buildPath));

  return router;
}
