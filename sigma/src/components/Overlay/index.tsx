import React from "react";
import ReactDOM from "react-dom";
import { root } from "common";
import clsx from "clsx";

import style from "./index.module.scss";

export default function Overlay({ onOutSideClick, ...props }: Props) {
  const clickOut = onOutSideClick
    ? (event: any) => {
        const { currentTarget, target } = event;
        if (currentTarget !== target) return;
        onOutSideClick(event);
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

type OnClick = Native["onClick"];

interface Props extends Omit<Native, "ref"> {
  onOutSideClick?: OnClick;
}
