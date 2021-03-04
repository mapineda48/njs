import https, { RequestOptions } from "https";
import { Response } from "express";

/**
 * http://xtel.in/simple-chunked-data-handling-using-express-server-and-nodejs-client.html
 */

export async function redirect(req: RedirectRequest) {
  const { url, options, res, data } = req;

  return new Promise<void>((resolve, reject) => {
    const _req = https.request(url, options, (_res) => {
      _res.on("data", (chunk) => {
        res.write(chunk);
      });

      _res.on("end", () => {
        res.end();
        resolve();
      });

      _res.on("error", (err) => {
        reject(err);
      });
    });

    if (data) {
      _req.write(data, (err) => {
        if (err) reject(err);
      });
    }

    _req.end();
  });
}

export async function search(start: number, res: Response) {
  const data = JSON.stringify({
    startRecordNum: start,
    keyword: "",
    oppNum: "",
    cfda: "",
    oppStatuses: "forecasted|posted",
    sortBy: "openDate|desc",
  });

  return redirect({
    res,
    url: "https://www.grants.gov/grantsws/rest/opportunities/search/",
    options: {
      method: "POST",
      headers: {
        "data-type": "json",
        "content-type": "application/json; charset=utf-8",
      },
    },
    data,
  });
}

export function getDetail(id: number, res: Response) {
  const data = `oppId=${id}`;

  return redirect({
    res,
    url: "https://www.grants.gov/grantsws/rest/opportunity/details",
    options: {
      method: "POST",
      headers: {
        "data-type": "json",
        "content-type": "application/x-www-form-urlencoded",
      },
    },
    data,
  });
}

/**
 * Typings
 */

interface RedirectRequest {
  url: string;
  options: RequestOptions;
  res: Response;
  data: any;
}