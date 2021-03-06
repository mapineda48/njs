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

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
 */
export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") return "/";

  const base = document.getElementsByTagName("base")[0];

  if (!base?.href) return "/";

  const html = base.outerHTML;

  return html.replace('<base href="', "").replace('">', "");
}
