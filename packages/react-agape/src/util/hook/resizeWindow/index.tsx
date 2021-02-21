import React from "react";
import { useEventWindow } from "../eventWindow";

import style from "./index.module.scss";

/**
 *
 * This hook only dispatch a render with the event resize window
 *
 */
export const useResize = () => {
  const [wait, setWait] = React.useState(false);

  const reset = () => {
    setWait(true);
    setTimeout(() => setWait(false), 500); // is a try to prevent excess use cpu
  };

  useEventWindow(() => {
    return {
      resize: reset,
    };
  });

  return wait;
};
