import Database from "../../model";
import * as jwt from "../../jwt";
import Unauthorized from "../rpc/error/Unauthorized";
import { tryParseError } from "../rpc/error";
import { session, Req, Res, Next } from "../rpc";
import type SigIng from "../../api/auth/agape";
import type { User } from "../../api/auth/agape";

const sigIn: SigIng = async (...args: string[]) => {
  const [username, password] = args;
  const userAgent: string = session.get("userAgent");

  if (username && password) {
    const payload = await auth(username, password);

    const token = await jwt.sign(payload, "app", userAgent);

    return {
      token,
      user: await getUser(payload.userId),
    };
  }

  if (username) {
    const payload = await jwt.verify(username, "app", userAgent);

    delete payload.exp;
    delete payload.iat;

    const token = await jwt.sign(payload, "app", userAgent);

    return {
      token,
      user: await getUser(payload.userId),
    };
  }

  throw new Unauthorized();
};

export function verify(req: Req, res: Res, next: Next) {
  const token = req.headers["token"]?.toString();

  const userAgent = req.headers["user-agent"];

  if (!token || !userAgent) {
    return next(new Unauthorized());
  }

  jwt
    .verify(token, "app", userAgent)
    .then((payload) => {
      next();
    })
    .catch((error) => next(error))
}

export async function getUser(id: number): Promise<User> {
  const user = await Database.user.findOne({ where: { id } });

  if (!user) {
    throw new Unauthorized();
  }

  return {
    fullName: user.getDataValue("fullName"),
    id: user.getDataValue("id"),
    avatarUrl: "",
  };
}

export async function auth(username: string, password: string) {
  let employeeId = 0;

  try {
    const access = await Database.access.findOne({
      where: { username, password, isEnabled: true },
    });

    employeeId = access?.getDataValue("employeeId") ?? employeeId;
  } catch (error) {
    console.log(tryParseError(error));
  }

  if (!employeeId) {
    throw new Unauthorized();
  }

  const employee = await Database.employee.findOne({
    where: { id: employeeId },
  });

  if (!employee) {
    throw new Unauthorized();
  }

  return employee.toJSON();
}

export default sigIn;
