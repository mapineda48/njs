import { Session } from "backend/api/rpc/agape";
import Form from "form";

export default class FormSession extends Form {
  readonly api: Session["api"];
  readonly model: Session["model"];
}
