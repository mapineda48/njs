import path from "path";
import express from "express";
import { baseUrl } from "../../api/baseUrl";
import { verify as agape } from "./agape";

export default function authenticate() {
  const route = express.Router();

  route.use(path.join(baseUrl.agape, "*"), agape);
  route.use(path.join(baseUrl.model, "*"), agape);
  //route.use(path.join(baseUrl.shop, "*"), verify(ShopHeader));

  return route;
}
