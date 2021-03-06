import ReactDOM from "react-dom";
import "./style/index.scss";

export const root = document.getElementById("root") as HTMLDivElement;

export const initialStateId =
  process.env.NODE_ENV === "development"
    ? "1"
    : root.getAttribute("initial-state");

    
export function render(element: JSX.Element) {
  const render =
    process.env.NODE_ENV === "development" ? ReactDOM.render : ReactDOM.hydrate;

  render(element, root);
}

