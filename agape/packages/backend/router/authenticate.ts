import express from "express";
import { AgapeHeader } from "../integration";
import { baseUrl as agape } from "../integration/agape";
import { baseUrl as model } from "../integration/model";
import { getVerify as verify } from "./api/authenticate/app";
import path from "path";

export default function authenticate() {
  const route = express.Router();

  const checkAgape = verify(AgapeHeader);

  route.use(path.join(agape, "*"), checkAgape);
  route.use(path.join(model, "*"), checkAgape);

  return route;
}
