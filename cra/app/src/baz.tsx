import React from "react";
import ReactDOM from "react-dom";

function App() {
  return <div>Hello World from baz!!!</div>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <a href="">foo</a>
  </React.StrictMode>,
  document.getElementById("root")
);
