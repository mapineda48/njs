import express from "express";
import fs from "fs-extra";
import { JSDOM } from "jsdom";
import path from "path";

export async function createReactAppRoute(baseURL: string, buildPath: string, buildRoute: string) {
  const htmlRoute = buildRoute + "/index.html";
  const reactAppHtml = await setBaseURLHtml(buildPath, baseURL);
  const reactRoute = express.Router();

  reactRoute.get(htmlRoute, (req, res) => res.send(reactAppHtml));
  reactRoute.use(buildRoute, express.static(buildPath));
  return reactRoute;
}

export async function setBaseURLHtml(build: string, baseURL: string) {
  const html = path.join(build, "index.html");

  return new Promise<string>((res, rej) => {
    fs.readFile(html, "utf-8", (err, data) => {
      if (err) {
        return rej(err);
      }
      //Update static file routes
      const dom = new JSDOM(data);

      const links = [
        ...Array.from(dom.window.document.querySelectorAll("script")).map(
          (script) => script.src
        ),
        ...Array.from(dom.window.document.querySelectorAll("link")).map(
          (script) => script.href
        ),
      ].map((src) => [src, baseURL + src]);

      links.forEach(([src, dest]) => (data = data.replace(src, dest)));

      //Allow to react client update all path to image,etc.
      data = data.replace(
        "<body>",
        `<body><script>window.currentHost = "${baseURL}";</script>`
      );
      return res(data);
    });
  });
}
