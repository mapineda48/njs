import React from "react";
import Button from "component/Button";
import { FaTimes, FaCheck } from "react-icons/fa";
import Fade from "../Fade";

import { useDispatch } from "store/hook";

import style from "./index.module.scss";

export default () => {
  const { management } = useDispatch();

  const message = "Confirme para Agregar el registro";

  return (
    <Fade className={style._}>
      <Button ripple green onClick={() => management.confirm(message)}>
        <FaCheck />
      </Button>
      <Button ripple red onClick={management.back}>
        <FaTimes />
      </Button>
    </Fade>
  );
};
