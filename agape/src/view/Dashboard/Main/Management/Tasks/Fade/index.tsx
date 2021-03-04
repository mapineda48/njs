import React from "react";
import { Router } from "view/Router";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

export default (props: Props) => {
  return React.createElement(Router, { ...props, animation });
};

/**
 * Typings
 */

type Props = Omit<Parameters<typeof Router>[number], "animation">;
