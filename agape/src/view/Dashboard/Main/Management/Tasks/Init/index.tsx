import React from "react";
import Button from "component/Button";
import { FaSearch, FaPlus } from "react-icons/fa";
import Fade from "../Fade";

import { useDispatch, useSelector } from "store/hook";

import style from "./index.module.scss";

export default () => {
  const canCreate = useSelector((state) => state.management.create);

  const { management } = useDispatch();

  return (
    <Fade className={style._}>
      <Button ripple title="Buscar" onClick={management.search}>
        <FaSearch />
      </Button>
      {canCreate && (
        <Button ripple title="Insertar" onClick={management.create}>
          <FaPlus />
        </Button>
      )}
    </Fade>
  );
};
