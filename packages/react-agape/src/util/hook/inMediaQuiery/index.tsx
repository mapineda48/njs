import React from "react";

import style from "./index.module.scss";

export const useInMediaQuery = (query: string) => {
  const [state, setState] = React.useState(window.matchMedia(query).matches);

  React.useEffect(() => {
    const resetMedia: ListenerMQ = (event) => setState(event.matches);

    const mql = window.matchMedia(query);

    mql.addEventListener("change", resetMedia);

    return () => mql.removeEventListener("change", resetMedia);
  }, [setState, query]);

  return state;
};


/**
 * Typings
 */

type ListenerMQ = (event: MediaQueryListEvent) => void;
