import React from "react";
import { Router } from "view/Router";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

export default () => {
  return (
    <Router className={style.welcome + " panel"} animation={animation}>
      <div>
        <h1 className={style.greeting}>Welcome</h1>
      </div>
    </Router>
  );
};
