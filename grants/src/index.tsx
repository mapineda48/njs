import { BrowserRouter } from "react-router-dom";
import http from "./http";
import App from "./App";
import { render, initialStateId, getBaseUrl } from "./common";
import reportWebVitals from "./reportWebVitals";

if (initialStateId) {
  const id = parseInt(initialStateId);
  http
    .fetchInitialState(id)
    .then((state) => {
      render(
        <BrowserRouter basename={getBaseUrl()}>
          <App initState={state} />
        </BrowserRouter>
      );
    })
    .catch((err) => console.error(err));
} else {
  render(
    <BrowserRouter basename={getBaseUrl()}>
      <App />
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
