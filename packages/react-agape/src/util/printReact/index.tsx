import React from "react";
import ReactDOM from "react-dom";

import style from "./index.module.scss";

export const printReact: Print = (ReactElement, title = "Imprimir") => {
  const windowPrint = window.open("", "", "");

  if (!windowPrint) {
    return;
  }

  windowPrint.document.title = title;

  const root = windowPrint.document.body.appendChild(
    windowPrint.document.createElement("div")
  );

  ReactDOM.render(ReactElement, root, () => {
    windowPrint.print();
    windowPrint.close();
  });
};

/**
 * Typings
 */

type Print = (ReactElement: JSX.Element, title?: string) => void;
