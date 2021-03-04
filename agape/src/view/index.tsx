import React from "react";
import Store from "./Store";
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";

import { createRouters } from "./Router/util";

const Routers = createRouters({
  selector: ({ app }) => app.root,
  actionEnd: ({ app }) => app.endRoot(),
  setRouters: ({ app: { app } }) => [
    { type: app.LOGIN, Component: LogIn },
    { type: app.DASHBOARD, Component: Dashboard },
  ],
});

export default () => {
  return (
    <Store>
      <Routers />
    </Store>
  );
};
