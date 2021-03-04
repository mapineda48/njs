import React from "react";
import Detail from "./Detail";
import Search from "./Search";
import Table from "./Table";

import { Router } from "view/Router";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

export default () => {
  return (
    <Router className={style._} animation={animation}>
      <Table />
      <Detail />
      <Search />
    </Router>
  );
};
