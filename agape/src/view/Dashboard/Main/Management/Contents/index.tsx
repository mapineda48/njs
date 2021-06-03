import Notification, { set } from "./Notification";
import Form from "./Form";
import Results from "./Results";
import { createRouters } from "view/Router/util";

export default createRouters({
  disabledBody: true,
  selector: (state) => state.management.collapsible,
  actionEnd: ({ management }) => management.endCollapsible(),
  setRouters: ({ management: { view } }) => [
    { type: view.NOTIFICATE, Component: set() },
    { type: view.CONFIRM, Component: set() },
    { type: view.FINISH, Component: set() },
    { type: view.CREATE, Component: Form },
    { type: view.EDIT, Component: Form },
    { type: view.RESULTS, Component: Results },
  ],
});
