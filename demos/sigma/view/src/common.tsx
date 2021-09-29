import React from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";

export const root = document.getElementById("root") as HTMLDivElement;

export function render(children: JSX.Element) {
  ReactDOM.render(<React.StrictMode>{children}</React.StrictMode>, root);
}
