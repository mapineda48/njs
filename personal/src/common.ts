import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

export const root = document.getElementById("root");

export function hydrate(Element: JSX.Element) {
  const render =
    process.env.NODE_ENV === "development" ? ReactDOM.render : ReactDOM.hydrate;

  render(Element, root);
}

export function render(Element: JSX.Element) {
  ReactDOM.render(Element, root);
}

export default render;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
