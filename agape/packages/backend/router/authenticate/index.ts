import { Authentication } from "../../api/public";
import { AgapeHeader, ShopHeader, Auth } from "../../api/client";
import * as jwt from "../../jwt";
import Unauthorized from "../../error/Unauthorized";
import { verify as loginApp } from "./app";
import { session } from "../api";

export async function sign(credential: Authentication) {
  const userAgent: string = session.get("userAgent");

  if (!userAgent) {
    throw new Unauthorized();
  }

  const { app, authentication } = getAuthentication(credential);

  let token: string;

  if (!authentication.includes(Auth)) {
    const payload = await jwt.verify(authentication, app, userAgent);

    if(typeof payload !== "string"){
      delete payload.exp;
      delete payload.iat;
    }

    // refresh token
    token = await jwt.sign(payload, app, userAgent);
  } else {
    const [username, password] = authentication.split(Auth);

    const payload = await loginApp(app, username, password);

    token = await jwt.sign(payload, app, userAgent);
  }

  return token;
}

function getAuthentication({ agape, shop }: Authentication) {
  if (agape && shop) {
    throw new Unauthorized();
  }

  if (agape) {
    return {
      app: AgapeHeader,
      authentication: agape,
    };
  }

  if (shop) {
    return {
      app: ShopHeader,
      authentication: shop,
    };
  }

  throw new Unauthorized();
}
