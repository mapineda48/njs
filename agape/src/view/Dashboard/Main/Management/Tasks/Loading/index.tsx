import React from "react";
import Button from "component/Button";
import { FaCheck } from "react-icons/fa";
import Fade from "../Fade";

import style from "./index.module.scss";

export default () => {
  return (
    <Fade>
      <Button green loading>
        <FaCheck />
      </Button>
    </Fade>
  );
};
