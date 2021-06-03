import { errCheckNumber } from "./util";

export function handlerError(error: any): Error {
  console.log(error);

  switch (error.message) {
    case errCheckNumber.MISSING:
    case errCheckNumber.INVALID: {
      const { message } = error;
      return [404, { message }];
    }
  }

  return [500, { message: "unhandler server error." }];
}

/**
 * Types
 */
type Error = [number, { message: string }];
