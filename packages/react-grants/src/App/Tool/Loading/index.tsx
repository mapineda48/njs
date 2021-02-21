import React from "react";
import { useGrants } from "App/Context";

import style from "./index.module.scss";

export default function () {
  const [state] = useGrants();

  return <div className={style._}>{state.message}</div>;
}
