import * as jwt from "./jwt";
import Unauthorized from "../../error/Unauthorized";
import { AgapeHeader, ShopHeader, TokenHeader } from "../../integration";
import { Authentication } from "../../integration/public";
import { Next, Req, Res } from "../../router/error";
import { verify as loginApp } from "./app";

const UserAgentHeader = "user-agent";
const tokenPrefix = new RegExp(`^${TokenHeader}`);

export async function sign(body: any, userAgent: string) {
  if (!userAgent) {
    throw new Unauthorized();
  }

  const { app, authentication } = getAuthentication(body);

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

export function verify(app: string) {
  return async (req: Req, res: Res, next: Next) => {
    const token = req.headers[app]?.toString();

    const userAgent = req.headers["user-agent"];

    if (!token || !userAgent) {
      throw new Unauthorized();
    }

    await jwt.verify(token, app, userAgent);

    return next();
  };
}

function getAuthentication(body: [Authentication]) {
  const [{ agape, shop }] = body || [];

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

export const agape = verify(AgapeHeader);

export const onRequest = ({ body, headers }: Req, res: Res, next: Next) => {
  sign(body, headers[UserAgentHeader] ?? "")
    .then((token) => res.json(token))
    .catch(next);
};
