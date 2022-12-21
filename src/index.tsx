import React from "react";
import ReactDOM from "react-dom/client";
import Report from "./Template";
import puppeteer from "./puppeteer";

const templ = !(process.env.NODE_ENV === "development") ? undefined : "example";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

(async function main() {
  const { template = templ, data = undefined } = !puppeteer.getDataReport
    ? {}
    : await puppeteer.getDataReport();

  root.render(
    <React.StrictMode>
      <Report template={template} data={data} />
    </React.StrictMode>
  );
})().catch(console.error);
