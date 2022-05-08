import React from "react";

const Context = React.createContext<React.RefObject<HTMLDivElement>>({
  current: null,
});

export function useLayout() {
  return React.useContext(Context);
}

export function Layout(props: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);

  return <Context.Provider value={ref}>{props.children}</Context.Provider>;
}

export function useLeftMenu<T extends HTMLElement>() {
  const leftBar = useLayout();
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const bar = leftBar.current;

    const div = ref.current;

    if (!bar || !div) {
      return;
    }

    const setHeight = () => {
      const { top, right } = bar.getBoundingClientRect();

      div.style.top = top + "px";
      div.style.left = right + "px";
      div.style.height = `calc(100vh - ${top}px)`;
      div.style.maxHeight = `calc(100vh - ${top}px)`;
      div.style.maxWidth = "300px";
      div.style.position = "fixed";
      div.style.display = "";
    };

    setHeight();

    window.addEventListener("resize", setHeight);

    return () => window.removeEventListener("resize", setHeight);
  }, [leftBar, ref]);

  return ref;
}

export function LeftBar(props: Props) {
  const ref = useLayout();

  React.useEffect(() => {
    const div = ref.current;

    if (!div) {
      return;
    }

    const setHeight = () => {
      const { top } = div.getBoundingClientRect();

      div.style.height = `calc(100vh - ${top}px)`;
      div.style.maxHeight = `calc(100vh - ${top}px)`;
      //div.style.minHeight = contextHeight + "px";
      div.style.position = "fixed";
    };

    setHeight();

    window.addEventListener("resize", setHeight);

    return () => window.removeEventListener("resize", setHeight);
  }, [ref]);

  return <div {...props} style={{ width: 80 }} ref={ref} />;
}

export function Main(props: Props) {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        paddingLeft: 80,
      }}
    />
  );
}

/**
 * Types
 */
type Props = Omit<JSX.IntrinsicElements["div"], "ref">;
