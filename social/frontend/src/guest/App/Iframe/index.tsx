import React from "react";

/**
 * https://stackoverflow.com/questions/29983786/blocked-a-frame-of-origin-null-from-accessing-a-cross-origin-frame-chrome/65234451
 * https://stackoverflow.com/questions/935127/how-to-access-parent-iframe-from-javascript
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/frameElement
 */
export const iframe = window.frameElement as HTMLIFrameElement;

export const inIframe = Boolean(iframe);

const size = {
  min: {
    height: "185px",
    width: "40px",
  },
  max: {
    height: "410px",
    width: "340px",
  },
};

/**
 * Prepare iframe to display widget.
 */
if (inIframe) {
  iframe.style.position = "fixed";
  iframe.style.zIndex = "1000";
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.style.borderRadius = "4px";
  iframe.style.border = "none";
  /**
   * Important set transparent body
   * https://www.geeksforgeeks.org/how-to-create-a-transparent-iframe/
   */
  document.body.style.backgroundColor = "transparent";
}

function setSize({ height, width }: Size) {
  if (process.env.NODE_ENV === "development") {
    if (!inIframe) {
      throw new Error("This component must be called inside an iframe");
    }
  }

  iframe.style.width = width;
  iframe.style.height = height;
  iframe.style.top = `calc((100vh - ${height}) / 2)`;
  iframe.style.right = "0px";
}

export default function Iframe(props: Props): JSX.Element {
  const canOpen = inIframe && props.open;

  React.useEffect(() => {
    if (!inIframe) return;

    if (canOpen) return setSize(size.max);

    setSize(size.min);
  }, [canOpen]);

  return props.children as any;
}

export function getIframe() {
  if (!inIframe) return null;

  return function open(state = true) {
    if (state) {
      return setSize(size.max);
    }

    setSize(size.min);
  };
}

/**
 * Types
 */
type Size = typeof size[keyof typeof size];

interface Props {
  open: boolean;
  children: React.ReactNode;
}
