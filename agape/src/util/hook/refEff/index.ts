import React from "react";

import style from "./index.module.scss";

/**
 * Warning: Experimental hook
 *
 * Return a callback that received as arg another callback that received html reference and
 * return last callback that catch the reference and mutate with react hook effect
 * when mount component.
 *
 * note: if you note somthing wrong, please report me
 *
 * @param deps react hook effect dependecy
 */
export const useRefEff: HookRefEff = (cb, deps) => {
  const [init, setInit] = React.useState(true);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const cbRef = React.useRef<Current>(() => {});

  let pipe;

  if (deps) {
    if (deps.length > 0) {
      if (init) {
        pipe = deps.map((val) => !val);
      } else {
        pipe = deps;
      }
    } else {
      pipe = [init];
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => cbRef.current(), pipe);

  return (ref: any) => {
    if (!ref) {
      return;
    }

    cbRef.current = () => cb(ref);

    if (init) {
      setInit(false);
    }
  };
};

/**
 * Typings
 */

type HookRefEff = <T extends HTMLElement = HTMLDivElement>(
  cb: ((ref: T) => void) | ((ref: T) => () => void),
  deps?: Deps
) => (ref: T | null) => void;

type Deps = any[];

type Current = (() => void) | (() => () => void);
