import React from "react";
import Button from "component/Button";
import { FaTimes, FaCheck } from "react-icons/fa";
import Fade from "../Fade";

import { useDispatch, useSelector } from "store/hook";

import style from "./index.module.scss";

export default () => {
  const readonly = useSelector((state) => state.management.readonly);

  const { management } = useDispatch();

  const message = "Seguro de aplicar los cambios";

  

  return (
    <Fade className={style._}>
      <Button
        ripple
        green
        disabled={readonly}
        onClick={() => management.confirm(message)}
      >
        <FaCheck />
      </Button>
      <Button ripple red onClick={management.back}>
        <FaTimes />
      </Button>
    </Fade>
  );
};
