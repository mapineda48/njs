import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { render, getId, getBaseUrl } from "./common";
import { createUrlId } from "./shared";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import type { Data } from "./shared";

const currentState = getId();

if (!currentState) {
  render(
    <React.StrictMode>
      <BrowserRouter basename={getBaseUrl()}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  axios
    .get<Data>(createUrlId(currentState))
    .then(({ data }) => {
      render(
        <React.StrictMode>
          <BrowserRouter basename={getBaseUrl()}>
            <App {...data} />
          </BrowserRouter>
        </React.StrictMode>
      );
    })
    .catch((err) => console.error(err));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
