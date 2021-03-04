import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useGrants } from "App/Context";

import style from "./index.module.scss";

export default function () {
  const [, action] = useGrants();

  return (
    <div className={style._}>
      <span title="show opportunitys" onClick={action.showOpportunitys}>
        <FaCheckCircle />
      </span>
    </div>
  );
}
