import fs from "fs-extra";
import path from "path";
import express from "express";
import puppeteer from "puppeteer";

/**
 * Pages target
 */
const pages = ["/", "/es/"];

const port = 3000;

const build = path.join(__dirname, "build");

const index = path.join(build, "index.html");

const app = express();

app.use(express.static(build));

app.use("*", (req, res) => res.sendFile(index));

app.listen(port, async () => {
  console.log(`render listening on port ${port}`);

  try {
    await start(pages);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
});

async function start(routes: string[]) {
  const pages = routes.map((page) => {
    return {
      route: "http://localhost:3000" + page,
      file: path.join(build, "." + page + "index.html"),
    };
  });

  await Promise.all(
    pages.map(async ({ route, file }) => {
      const html = await render(route);
      await fs.outputFile(file, html);
      console.log(file);
    })
  );
}

/**
 * https://developers.google.com/web/tools/puppeteer/articles/ssr
 */

export async function render(url: string) {
  const start = Date.now();

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  try {
    // networkidle0 waits for the network to be idle (no requests for 500ms).
    // The page's JS has likely produced markup by this point, but wait longer
    // if your site lazy loads, etc.
    await page.goto(url, { waitUntil: "networkidle0" });
  } catch (err) {
    console.error(err);
  }

  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();

  const ttRenderMs = Date.now() - start;
  console.info(`Headless rendered page in: ${ttRenderMs}ms`);

  return html;
}
