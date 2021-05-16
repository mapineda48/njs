import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, getBaseUrl } from "./common";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/**
 * https://reactrouter.com/web/api/BrowserRouter/basename-string
 */

render(
  <React.StrictMode>
    <BrowserRouter basename={getBaseUrl()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
