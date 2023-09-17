import rawBody from "raw-body";
import Storage from "../../storage";
import { Req, Res, Next } from "../rpc";
import BadRequest from "../rpc/error/BadRequest";

const ContentType = "content-type";
const ContentLenght = "content-length";

export const path = "*";

export async function onReq(req: Req, res: Res, next: Next) {
  const contentType = req.headers[ContentType];
  const contentLength = req.headers[ContentLenght];
  const url = req.originalUrl;
  const urlApi = "/api/agape/uploadFile/";

  if (!contentType) {
    throw new BadRequest("missing content-type");
  }

  const mimeType = contentType.split(";")[0];

  const contentFile = await rawBody(req, {
    length: contentLength,
    limit: "2mb", // limita el tamaño de los archivos que puedes recibir
  });

  const filename = url.replace(urlApi, "");

  Storage.uploadPublic(contentFile, filename, mimeType)
    .then((url) => res.json(url))
    .catch(next);
}

/**
 * Types
 */