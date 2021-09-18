import ReactDOM from "react-dom";
import React from "react";

/**
 * React DOM
 */
export const root = document.getElementById("root") as HTMLDivElement;

export function render(element: JSX.Element) {
  ReactDOM.render(element, root);
}

export function renderExp(element: () => JSX.Element) {
  ReactDOM.render(React.createElement(element, {}, null), root);
}

/**
 * Types
 */
type Element = Parameters<typeof ReactDOM.render>[0];
