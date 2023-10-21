import "./index.scss";
import "./extensions";
import "bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import div from "root";
import App from "App";
//import App from "Router.v2/index.dev";
// import reportWebVitals from "./reportWebVitals";

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
