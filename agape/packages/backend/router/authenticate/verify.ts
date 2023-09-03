import { AgapeHeader, ShopHeader } from "../../api/client";
import { baseUrl } from "../../api/baseUrl";
import * as jwt from "../../jwt";
import Unauthorized from "../../error/Unauthorized";
import { Req, Res, Next } from "../error";
import path from "path";
import express from "express";

export default function authenticate() {
  const route = express.Router();

  const checkAgape = verify(AgapeHeader);

  route.use(path.join(baseUrl.agape, "*"), checkAgape);
  route.use(path.join(baseUrl.model, "*"), checkAgape);
  route.use(path.join(baseUrl.shop, "*"), verify(ShopHeader));

  return route;
}

export function verify(app: string) {
  return (req: Req, res: Res, next: Next) => {
    const token = req.headers[app]?.toString();

    const userAgent = req.headers["user-agent"];

    if (!token || !userAgent) {
      return next(new Unauthorized());
    }

    jwt
      .verify(token, app, userAgent)
      .then((payload) => {
        //console.log({ payload });
      })
      .catch((err) => console.error(err));

    return next();
  };
}
