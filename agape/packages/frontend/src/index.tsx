import "./index.scss";
import "./extensions";
import "bootstrap";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import TestUploadFile from "./api/Agape/react.dev";
import FormTest from "Form/index.dev";
import Menu from "./Agape/Menu";
import PersonTest from "Agape/Form/Config.dev";

//import { foo } from "backend/build/foo";
import { Op } from "backend";
import ContentPage from "Agape/Context";

/**
 * https://github.com/facebook/react/issues/24502
 */
function App(props: { children: ReactNode }) {
  if (process.env.NODE_ENV === "development") {
    return <>{props.children}</>;
  }

  return <React.StrictMode>{props.children}</React.StrictMode>;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <App>
    <PersonTest />
  </App>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
