import fs from "fs";
import { resolve } from "../../paths";

let html = "";

export function loadHtml(baseUrl = "/") {
  const file = resolve("build", "index.html");

  const data = fs.readFileSync(file, "utf-8");

  const href = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

  html = data.replace("<head>", `<head><base href="${href}">`);
}

export function setInHtml(title: string, data: string, state?: number) {
  const res = html.replace(
    "<title>React App</title>",
    `<title>${title}</title>`
  );

  if (!state) {
    return res.replace(
      '<div initial-state="" id="root"></div>',
      `<div id="root">${data}</div>`
    );
  }

  return res.replace(
    '<div initial-state="" id="root"></div>',
    `<div initial-state="${state}" id="root">${data}</div>`
  );
}
