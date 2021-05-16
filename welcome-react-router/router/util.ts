import fs from "fs";
import { index } from "./paths";

let html = "";

export function loadHTML(baseUrl = "/") {
  fs.readFile(index, "utf-8", (err, data) => {
    if (err) return console.error(err);

    const href = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

    html = data.replace("</head>", `<base href="${href}"></head>`);
  });
}

export function injectInHtml(data: string) {
  return html.replace('<div id="root"></div>', `<div id="root">${data}</div>`);
}
