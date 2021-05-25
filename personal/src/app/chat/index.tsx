import App from "./App";
import ReactDOM from "react-dom";

export const root = (() => {
  const id = "root-chat";

  const current = document.getElementById(id);

  if (current) return current;

  const root = document.createElement("div");

  root.id = id;

  return document.appendChild(root);
})();

ReactDOM.render(<App />, root);


