import fs from "fs-extra";
import path from "path";
import express from "express";
import puppeteer from "puppeteer";
import model from "../src/personal/model";
import { minifyString } from "./minify";

/**
 * Generate Model Production
 */
const file = path.resolve("build/model.json");

fs.outputJSONSync(file, minifyString(model));

/**
 * Pages target
 */
const pages = ["/", "/es/"];

const port = 3000;

const root = path.resolve("build");

const app = express();

app.use(express.static(root));

app.listen(port, start);

async function start() {
  console.log(`Prerender listening on port ${port}`);

  try {
    const promises = pages.map(async (page) => {
      const html = await prerender("http://localhost:3000" + page);

      const file = path.resolve("build", "." + page + "index.html");

      await fs.outputFile(file, html);

      console.log(file);
    });

    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }

  process.exit();
}

/**
 * https://developers.google.com/web/tools/puppeteer/articles/ssr
 */

export async function prerender(url: string) {
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
