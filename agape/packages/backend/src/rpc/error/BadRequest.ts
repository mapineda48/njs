import RouteError from "./RouteError";

export default class BadRequest extends RouteError {
  constructor(message: string) {
    super(400, message);
  }
}
