import React from "react";
import Init from "./Init";
import Detail from "./Info";
import Cash from "./Cash";
import Loader from "./Loader";
import { Fatal, Error, Success } from "./Notification";
import { Router } from "view/Router";

import { createRouters } from "view/Router/util";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

const Routers = createRouters({
  disabledBody: true,
  selector: (state) => state.invoice.view,
  actionEnd: ({ invoice }) => invoice.endView(),
  setRouters: ({ invoice }) => [
    { type: invoice.view.LOADER, Component: Loader },
    { type: invoice.view.FATAL, Component: Fatal },
    { type: invoice.view.ERROR, Component: Error },
    { type: invoice.view.SUCCES, Component: Success },
    { type: invoice.view.OPEN, Component: Init },
    { type: invoice.view.DETAIL, Component: Detail },
    { type: invoice.view.CASH, Component: Cash },
  ],
});

export default () => {
  return (
    <Router className={style._} animation={animation}>
      <Routers />
    </Router>
  );
};
