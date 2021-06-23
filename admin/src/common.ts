import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";

export function render(element: JSX.Element) {
  ReactDOM.render(element, document.getElementById("root"));
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
 * https://reactrouter.com/web/api/BrowserRouter/basename-string
 */
export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") return "/";

  const base = document.getElementsByTagName("base")[0];

  if (!base?.href) return "/";

  const html = base.outerHTML;

  return html.replace('<base href="', "").replace('">', "");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
