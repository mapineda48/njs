import React from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";

export const root = document.getElementById("root") as HTMLDivElement;

export function render(children: JSX.Element) {
  const element = React.createElement(React.StrictMode, { children });

  ReactDOM.render(element, root);
}

export function hydrate(children: JSX.Element) {
  const element = React.createElement(React.StrictMode, { children });

  const hydrate =
    process.env.NODE_ENV === "development" ? ReactDOM.render : ReactDOM.hydrate;

  hydrate(element, root);
}
