import React from "react";
import Overlay from "../Overlay";
import Button from "../Button";

import style from "./index.module.scss";

export default function (props: Props) {
  const { children, onClick, title } = props;

  if (!children) return null;

  return (
    <Overlay onOutSideClick={onClick}>
      <div className={`panel ${style._}`}>
        <h1>{title || "Aviso"}</h1>
        <p>{children}</p>
        <Button red onClick={onClick}>
          Aceptar
        </Button>
      </div>
    </Overlay>
  );
}

/**
 * Types
 */

interface Props {
  title?: string;
  children: string;
  onClick?: () => void;
}
