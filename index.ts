import express from "express";
import logger from "morgan";
import path from "path";
import puppeteer, { Page } from "puppeteer";
import { setBaseURLHtml } from "./lib/react";

const host = "http://localhost:3000";
const buildRoute = "/report/template";
const htmlRoute = buildRoute + "/index.html";
const baseURL = host + buildRoute;
const htmlURL = host + htmlRoute;

const build = path.join(__dirname, "build");

const app = express();

app.use(logger("dev"));

app.listen(3000, () => {
  console.log("server on port 3000");
});

puppeteer
  .launch({ args: ["--no-sandbox"] })
  .then((browser) => {
    app.get("/pdf", async (req, res) => {
      const msg = req.query.msg;

      const page = await browser.newPage();

      await page.exposeFunction("getDataReport", () => {
        return { template: "react", data: msg };
      });

      await Promise.all([
        page.goto(htmlURL, {
          waitUntil: "domcontentloaded",
        }),
        page.waitForNetworkIdle({ idleTime: 150 }),
      ]);

      const pdf = await page.pdf();
      res.writeHead(200, setHeaderToPDFFile(pdf));
      res.end(pdf);

      page.close().catch(console.error);
    });

    return setBaseURLHtml(build, baseURL);
  })
  .then((html) => {
    app.get(htmlRoute, (req, res) => res.send(html));
    app.use(buildRoute, express.static(build));
  })
  .catch((err) => console.error(err));

async function setReadyRender(page: Page) {
  let cb = () => {};

  await page.exposeFunction("readyReportRender", () => cb());

  return {
    IsReadyRender: new Promise<void>((res) => {
      cb = res;
    }),
  };
}

function setHeaderToPDFFile(pdf: Buffer) {
  return {
    "Content-Type": "application/pdf",
    // "Content-Disposition": "attachment; filename=file.pdf", //Uncomment to download file without preview on the browser
    "Content-Length": pdf.length,
  };
}
