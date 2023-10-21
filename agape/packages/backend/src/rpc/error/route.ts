import { ErrorRequestHandler } from "express";
import { tryParseError } from ".";

const onRequestError: ErrorRequestHandler = (error, req, res, next) => {
  const [code, message] = tryParseError(error);

  return res.status(code).json({ message });
};

export default onRequestError;
