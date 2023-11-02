import { Session } from "backend/api/rpc/agape";
import Form, { IState } from "form";

export default class FormSession extends Form {
  readonly api: Session["api"];
  readonly models: Session["models"];
}

export type { IState };
