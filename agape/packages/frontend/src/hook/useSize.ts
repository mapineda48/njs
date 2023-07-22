import React, { DependencyList, useRef } from "react";

export default function useSize<T extends HTMLElement>(
  cb: (el: T) => (() => void) | void,
  deps?: DependencyList
): (el: T | null) => void;
export default function useSize(cb: any, deps?: any) {
  const ref = useRef();

  React.useEffect(() => {
    const resize = () => cb(ref.current);

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return (el: any) => {
    ref.current = el;
    if (el) {
      cb(el);
    }
  };
}
