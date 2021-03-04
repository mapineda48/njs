import React from "react";

import { useEventWindow } from "util/hook/eventWindow";

export const initState = (): State => {
  return {
    aboslute: {},
    fixed: {},
  };
};

const catchAbsolute = (ref: HTMLDivElement) => {
  return (state: State): State => {
    const { scrollTop } = ref.parentElement as HTMLDivElement;

    return {
      ...state,
      aboslute: {
        position: "absolute",
        bottom: scrollTop ? (scrollTop - ref.offsetHeight - 5) * -1 : 5,
        right: 5,
        zIndex: 15,
        display: "flex",
      },
    };
  };
};

const catchFixed = (ref: HTMLDivElement) => {
  return (state: State): State => {
    if (!state.aboslute.position) {
      return catchAbsolute(ref)(state);
    }

    const rect = ref.getBoundingClientRect();

    return {
      ...state,
      fixed: {
        position: "fixed",
        left: rect.left,
        top: rect.top,
        zIndex: 15,
        display: "flex",
      },
    };
  };
};

export default ({ fixed, ...props }: Props) => {
  const [inlineStyle, setStyle] = React.useState(initState);

  React.useMemo(() => {
    setStyle(initState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixed]);

  useEventWindow(() => {
    return { resize: () => setStyle(initState) };
  });

  const setAbsolute: OnRef = (ref) => {
    if (inlineStyle.aboslute.position || !ref) {
      return;
    }
    setStyle(catchAbsolute(ref));
  };

  const setFixed: OnRef = (ref) => {
    if (inlineStyle.fixed.position || !ref) {
      return;
    }
    setStyle(catchFixed(ref));
  };

  const style = {
    ...props.style,
    ...(inlineStyle.fixed.position ? inlineStyle.fixed : inlineStyle.aboslute),
  };

  return React.createElement("div", {
    ...props,
    ref: fixed ? setFixed : setAbsolute,
    style,
  });
};

/**
 * Typings
 */
type OnRef = (ref: HTMLDivElement | null) => void;

interface State {
  aboslute: React.CSSProperties;
  fixed: React.CSSProperties;
}

type NativeProps = Omit<JSX.IntrinsicElements["div"], "ref">;

interface Props extends NativeProps {
  fixed: boolean;
}
