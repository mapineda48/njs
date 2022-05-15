import React from "react";

export function useSize<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const setSize = () => {
      const { top, left } = el.getBoundingClientRect();

      el.style.height = `calc(100vh - ${top}px)`;
      el.style.maxHeight = `calc(100vh - ${top}px)`;
      el.style.width = `calc(100vw - ${left}px)`;
      el.style.maxWidth = `calc(100vw - ${left}px)`;
    };

    setSize();

    window.addEventListener("resize", setSize);

    return () => window.removeEventListener("resize", setSize);
  });

  return ref;
}

export function useHeight<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const setHeight = () => {
      const { top } = el.getBoundingClientRect();

      el.style.height = `calc(100vh - ${top}px)`;
      el.style.maxHeight = `calc(100vh - ${top}px)`;
    };

    setHeight();

    window.addEventListener("resize", setHeight);

    return () => window.removeEventListener("resize", setHeight);
  }, [ref]);

  return ref;
}


/**
 * Types
 */
type Props = Omit<JSX.IntrinsicElements["div"], "ref">;
