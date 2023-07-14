import "./extensions";
import "bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import TestUploadFile from "./api/Agape/react.dev";
import FormTest from "Form.v5/index.dev";

//import { foo } from "backend/build/foo";
import { Op } from "backend";

const isDev = process.env.NODE_ENV === "development";

function App() {
  return <div>Hello World!!!</div>;
}

/**
 * https://github.com/facebook/react/issues/24502
 */
const element = isDev ? (
  <FormTest />
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
