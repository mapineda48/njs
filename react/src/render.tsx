import React from "react";
import ReactDOM from "react-dom";

export const root = document.getElementById("root") as HTMLDivElement;

export function render(
  Component: () => JSX.Element,
  container?: HTMLElement
): void;
export function render(Element: JSX.Element, container?: HTMLElement): void;
export function render(Val: any, container?: any): void {
  const Element = typeof Val === "function" ? <Val /> : Val;

  ReactDOM.render(
    <React.StrictMode>{Element}</React.StrictMode>,
    container || document.getElementById("root")
  );
}

export default render;
