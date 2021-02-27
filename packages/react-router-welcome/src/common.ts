import ReactDOM from "react-dom";

const root = document.getElementById("root");

export function render(App: JSX.Element) {
  const render =
    process.env.NODE_ENV === "development" ? ReactDOM.render : ReactDOM.hydrate;

  render(App, root);
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
