import React from "react";
import { Router } from "view/Router";
import Tables from "./Table";
import Tasks from "./Tasks";
import Contents from "./Contents";
import { IoIosCloseCircle } from "react-icons/io";

import { useDispatch } from "store/hook";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

export default () => {
  const { management } = useDispatch();

  return (
    <Router className={style._} animation={animation}>
      <div className={style.table}>
        <Tables />
        <IoIosCloseCircle
          onClick={management.init}
          className={style.close}
          title="Cancelar"
        />
      </div>
      <Contents />
      <div className={style.task}>
        <Tasks />
      </div>
    </Router>
  );
};
