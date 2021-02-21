import React from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";

export const root = document.getElementById("root") as HTMLDivElement;

export function render(children: JSX.Element) {
  const element = React.createElement(React.StrictMode, { children });

  ReactDOM.render(element, root);
}
