import fs from "fs";
import { resolve } from "../paths";

const html = fs.readFileSync(resolve("frontend/build/index.html"), "utf8");

export function setInHtml(data: string, state?: string, title?: string) {
  let res = html;

  if (title) {
    res = res.replace("<title>React App</title>", `<title>${title}</title>`);
  }

  if (state) {
    res = res.replace(
      '<div state="" id="root"></div>',
      `<div state="${state}" id="root"></div>`
    );
  }

  return res.replace('id="root"></div>', `id="root">${data}</div>`);
}
