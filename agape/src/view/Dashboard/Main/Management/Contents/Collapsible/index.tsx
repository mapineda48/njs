import React from "react";
import { Router } from "view/Router";

import style from "./index.module.scss";
import clsx from "clsx";

const animation = { in: style.in, out: style.out };

export default (props: Props) => {
  return React.createElement(Router, {
    ...props,
    animation,
    className: clsx([props.className, style._]),
  });
};

/**
 * Typings
 */

type Props = Omit<Parameters<typeof Router>[number], "animation">;
