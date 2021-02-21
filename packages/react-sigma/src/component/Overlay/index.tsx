import React from "react";
import ReactDOM from "react-dom";
import { root } from "common";
import clsx from "clsx";

import style from "./index.module.scss";

export default function ({ onOutSideClick, ...props }: Props) {
  const clickOut = onOutSideClick
    ? ({ currentTarget, target }: any) => {
        if (currentTarget !== target) return;
        onOutSideClick();
      }
    : undefined;

  const [onClick] = [props.onClick, clickOut].filter(Boolean);

  return ReactDOM.createPortal(
    React.createElement("div", {
      ...props,
      onClick,
      className: clsx([props.className, style._]),
    }),
    root
  );
}

/**
 * Types
 */
type Native = JSX.IntrinsicElements["div"];

interface Props extends Omit<Native, "ref"> {
  onOutSideClick?: () => void;
}
