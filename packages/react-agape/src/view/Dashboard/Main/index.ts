import Welcome from "./Welcome";
import Invoice from "./Invoice";
import Management from "./Management";
import { createRouters } from "view/Router/util";

export default createRouters({
  disabledBody: true,
  selector: (state) => state.app.main,
  actionEnd: ({ app }) => app.endMain(),
  setRouters: ({ app: { main } }) => [
    { type: main.WELCOME, Component: Welcome },
    { type: main.INVOICE, Component: Invoice },
    { type: main.MANAGEMENT, Component: Management },
  ],
});

/**
 * Typings
 */
