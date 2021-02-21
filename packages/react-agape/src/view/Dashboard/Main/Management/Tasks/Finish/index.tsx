import React from "react";
import Button from "component/Button";
import { FaCheck } from "react-icons/fa";
import Fade from "../Fade";

import { useDispatch } from "store/hook";

import style from "./index.module.scss";

export default () => {
  const { management } = useDispatch();

  return (
    <Fade>
      <Button green ripple onClick={management.init}>
        <FaCheck />
      </Button>
    </Fade>
  );
};
