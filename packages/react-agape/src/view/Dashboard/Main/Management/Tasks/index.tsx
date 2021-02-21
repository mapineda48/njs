import Init from "./Init";
import Search from "./Search";
import Loading from "./Loading";
import Finish from "./Finish";
import Results from "./Results";
import Edit from "./Edit";
import Confirm from "./Confirm";
import Notificate from "./Notificate";
import Create from "./Create";

import { createRouters } from "view/Router/util";

export default createRouters({
  selector: ({ management }) => management.task,
  actionEnd: ({ management }) => management.endView(),
  setRouters: ({ management: { view } }) => [
    { type: view.OPEN, Component: Init },
    { type: view.SEARCH, Component: Search },
    { type: view.CREATE, Component: Create },
    { type: view.LOADING, Component: Loading },
    { type: view.NOTIFICATE, Component: Notificate },
    { type: view.RESULTS, Component: Results },
    { type: view.EDIT, Component: Edit },
    { type: view.CONFIRM, Component: Confirm },
    { type: view.FINISH, Component: Finish },
  ],
});
