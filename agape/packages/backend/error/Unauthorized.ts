import AppError from "./AppError";

export default class Unauthorized extends AppError {
  constructor() {
    super(401, "Unauthorized");
  }
}
