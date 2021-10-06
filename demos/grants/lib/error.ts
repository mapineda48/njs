import type { ErrorRequestHandler } from "express";

class Friendly {
  constructor(public code: number, public message: string) {}
}

export function parse(err: any): [number, string] {
  if (err instanceof Friendly) {
    return [err.code, err.message];
  }

  console.log(err);

  return [500, "unhandler error"];
}

export const middleErr: ErrorRequestHandler = (err, req, res, next) => {
  const [code, message] = parse(err);

  res.status(code).json({ message });
};

export default Friendly;
