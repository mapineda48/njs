import "./extensions";
import "bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const isDev = process.env.NODE_ENV === "development";

/**
 * https://github.com/facebook/react/issues/24502
 */
const element = isDev ? (
  <App />
) : (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(element);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
