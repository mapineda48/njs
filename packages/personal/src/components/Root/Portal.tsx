import React from "react";
import ReactDOM from "react-dom";

export default function Portal(props: Props) {
  const { children, container = document.body } = props;

  return ReactDOM.createPortal(children, container);
}

/**
 * Types
 */

interface Props {
  children: React.ReactNode | React.ReactNode[];
  container?: HTMLElement;
}
