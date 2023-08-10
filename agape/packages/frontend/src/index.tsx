import "./index.scss";
import "./extensions";
import "bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import PersonTest from "Agape/Form/Configuration/index.dev";

/**
 * https://github.com/facebook/react/issues/24502
 */
const EnvMode =
  process.env.NODE_ENV === "development" ? React.Fragment : React.StrictMode;


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <EnvMode>
    <PersonTest />
  </EnvMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
