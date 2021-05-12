import ReactDOM from "react-dom";
import './style/index.scss';

export const root = document.getElementById("root");

export function render(element: JSX.Element) {
  ReactDOM.render(element, root);
}
