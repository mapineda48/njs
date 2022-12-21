import { Request, Response, NextFunction } from "express";
import puppeteer, { Page } from "puppeteer";

export async function prepareMiddlewarePuppeteer(htmlURL: string) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  return async function middlewarePuppeteer(req: Req, res: Res, next: Next) {
    const { reportPDF } = req;

    if (!reportPDF) {
      return next();
    }

    const page = await browser.newPage();

    await page.exposeFunction("getDataReport", () => {
      return reportPDF;
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
  };
}

export function setHeaderToPDFFile(pdf: Buffer) {
  return {
    "Content-Type": "application/pdf",
    // "Content-Disposition": "attachment; filename=file.pdf", //Uncomment to download file without preview on the browser
    "Content-Length": pdf.length,
  };
}

export async function setReadyRender(page: Page) {
  let cb = () => {};

  await page.exposeFunction("readyReportRender", () => cb());

  return {
    IsReadyRender: new Promise<void>((res) => {
      cb = res;
    }),
  };
}

/**
 * Types
 */
export type MiddlewarePuppeteer = ReturnType<
  typeof prepareMiddlewarePuppeteer
> extends Promise<infer A>
  ? A
  : never;

type Next = NextFunction;

export interface Res extends Response {}

export interface Req extends Request {
  reportPDF?: ReportPDFTemplate;
}

export interface ReportPDFTemplate {
  template: string;
  data: any;
}
