import React from "react";
import Collapsible from "../Collapsible";

import { useSelector } from "store/hook";

import style from "./index.module.scss";

export const set = ()=>() => {
  const message = useSelector(
    (state) => state.management.collapsible.notification.current
  );

  return (
    <Collapsible className={style._}>
      <h1>{message}</h1>
    </Collapsible>
  );
};

export default () => {
  const message = useSelector(
    (state) => state.management.collapsible.notification.current
  );

  return (
    <Collapsible className={style._}>
      <h1>{message}</h1>
    </Collapsible>
  );
};