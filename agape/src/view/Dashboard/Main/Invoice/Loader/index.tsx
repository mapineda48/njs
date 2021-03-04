import React from "react";
import Loader from "component/Loader";
import { Router } from "view/Router";

import { useSelector } from "store/hook";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

export default () => {
  const message = useSelector(
    (state) => state.invoice.view.notification.current
  );

  return (
    <Router className={style._} animation={animation}>
      <Loader words={message} />
    </Router>
  );
};
