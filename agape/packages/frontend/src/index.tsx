import "./index.scss";
import "./extensions";
import "bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import div from "root";
import App from "App";
//import App from "App/Agape/Sigin";
//import App from "Form.v2/index.dev";
// import reportWebVitals from "./reportWebVitals";
//import App from "Form.v2/proxy.dev";
//import App from "Form.v5/index.dev";
//import App from "form.BETA4/index.dev";

/**
 * https://github.com/facebook/react/issues/24502
 */
const EnvMode =
  process.env.NODE_ENV === "development" ? React.Fragment : React.StrictMode;

const root = ReactDOM.createRoot(div);

root.render(
  <EnvMode>
    <App />
  </EnvMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
