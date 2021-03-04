import React from "react";

import style from "./index.module.scss";

/**
 * hook set css pointer events none to body
 */
export const useDisabledBody = (disabled: boolean) => {
  React.useEffect(() => {
    if (!disabled) {
      return;
    }

    const className = "_" + Math.random().toString(36).substring(2);

    const style = document.createElement("style");

    style.innerHTML = "." + className + "{pointer-events: none;}";

    document.head.appendChild(style);
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
      document.head.removeChild(style);
    };
  }, [disabled]);
};
