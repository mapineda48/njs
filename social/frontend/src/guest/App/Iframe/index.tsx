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
    height: "99vh",
    width: "99vw",
  },
};

/**
 * Prepare iframe to display widget.
 */
if (inIframe) {
  iframe.style.display = "initial";
  iframe.style.position = "fixed";
  iframe.style.right = "0px";
  iframe.style.top = "50%";
  iframe.style.transform = "translate(0px, -50%)";
  iframe.style.zIndex = "1000";
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.style.borderRadius = "4px";
  iframe.style.border = "none";
  iframe.style.maxHeight = "410px";
  iframe.style.maxWidth = "340px";
  /**
   * Important set transparent body
   * https://www.geeksforgeeks.org/how-to-create-a-transparent-iframe/
   */
  document.body.style.backgroundColor = "transparent";
}

function setSize({ height, width }: Size) {
  iframe.style.width = width;
  iframe.style.height = height;
}

export default function Iframe(props: Props): JSX.Element {
  if (process.env.NODE_ENV === "development") {
    if (!inIframe) {
      throw new Error("This component must be called inside an iframe");
    }
  }

  React.useEffect(() => {
    if (!inIframe) return;

    if (props.open) return setSize(size.max);

    setSize(size.min);
  }, [props.open]);

  return props.children as any;
}

/**
 * Types
 */
type Size = typeof size[keyof typeof size];

interface Props {
  open: boolean;
  children: React.ReactNode;
}
