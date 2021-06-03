import * as fs from "fs";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { index } from "./paths";
import { attribId } from "../src/shared";
import App from "../src/App";

import type { Data } from "../src/shared";

export function render(url: string, data?: Options) {
  const app = renderToString(url, data?.message);

  const html = prepareHtml(app, data?.id);

  return html;
}

/**
 * https://reactrouter.com/web/guides/server-rendering
 * @param url
 */
export function renderToString(url: string, message?: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      {message ? <App message={message} /> : <App />}
    </StaticRouter>
  );
}

/**
 * Load html was build wit CRA
 */
let html = "";

export function loadHTML(baseUrl = "/") {
  fs.readFile(index, "utf-8", (err, data) => {
    if (err) return console.error(err);

    const href = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

    html = data.replace("</head>", `<base href="${href}"></head>`);
  });
}

export function prepareHtml(app: string, id = "") {
  const result = !id
    ? `<div id="root">${app}</div>`
    : `<div id="root" ${attribId}="${id}">${app}</div>`;

  return html.replace('<div id="root"></div>', result);
}

/**
 * Types
 */

interface Options extends Data {
  id: string;
}
