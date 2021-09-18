import React from "react";
import ReactDOM from "react-dom";

export const root = document.getElementById("root") as HTMLDivElement;

export function render(element: JSX.Element) {
  ReactDOM.render(element, root);
}

export function renderDev(element: () => JSX.Element) {
  let container = root;

  if (!container) {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
  }

  const Element = React.createElement(element, null, null);

  ReactDOM.render(Element, container);
}
