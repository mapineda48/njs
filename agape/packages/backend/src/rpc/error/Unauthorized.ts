import RouteError from "./RouteError";

export default class Unauthorized extends RouteError {
  constructor() {
    super(401, "Unauthorized");
  }
}
