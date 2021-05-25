import { error as token } from "../lib/token";

export function handerError(error: any): Res {
  const { message } = error;

  switch (error.message) {
    case token.INVALID:
    case token.INVALID_TOKEN:
      return [400, { message }];

    case token.MALFORMED:
      return [400, { message: token.INVALID_TOKEN }];
  }

  console.log(error);

  return [500, { message: "unhandler server error." }];
}

/**
 * Types
 */
type Res = [number, { message: string }];
