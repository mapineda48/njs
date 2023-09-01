import * as jwt from "../../../jwt";
import Unauthorized from "../../../error/Unauthorized";
import { AgapeHeader, ShopHeader, TokenHeader } from "../../../integration";
import { Next, Req, Res } from "../../../router/error";
import { verify as loginApp } from "./app";
import { session } from "..";

const tokenPrefix = new RegExp(`^${TokenHeader}`);

export default async function sign(credential: Authentication) {
  const userAgent: string = session.get("userAgent");

  if (!userAgent) {
    throw new Unauthorized();
  }

  const { app, authentication } = getAuthentication(credential);

  let token: string;

  if (tokenPrefix.test(authentication)) {
    token = authentication.replace(tokenPrefix, "");

    const payload = await jwt.verify(token, app, userAgent);

    // refresh token
    token = await jwt.sign(payload, app, userAgent);
  } else {
    const [username, password] = authentication.split(":");

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

/**
 * Types
 */
export interface Authentication {
  agape?: string;
  shop?: string;
}
