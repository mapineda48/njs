export function handlerError(error: any): Err {
  console.log(error);

  switch (error.code) {
    case "ECONNREFUSED":
      return [500, "Fail connection DB"];
  }

  return [500, "unhandler error"];
}

/**
 * Types
 */
type Err = [number, string];
