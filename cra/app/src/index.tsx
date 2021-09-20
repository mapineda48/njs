import React from "react";
import ReactDOM from "react-dom";
import { greet } from "../message";

function App() {
  return <div>{greet}</div>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
