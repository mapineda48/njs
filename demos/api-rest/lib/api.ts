import path from "path";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import baseUrl from "./baseUrl";
import createModel, { Options as OptModel } from "./models";
import person from "./routers/person";
import { version } from "../package.json";

const schema = "demos_api_rest";

export default function create(opt: Opt) {
  const router = express.Router();

  api(opt)
    .then((api) => {
      router.use(baseUrl, api);
    })
    .catch((err) => {
      throw err;
    });

  return router;
}

export async function api(opt: Opt) {
  const { host, ...rest } = opt;

  const router = express.Router();

  const db = await createModel({ ...rest, schema });

  router.use("/person", person(db));

  router.use(swaggerUI.serve);

  router.get("/", swaggerUI.setup(getJsDocs(host)));

  return router;
}

function getJsDocs(host: string) {
  const ext = path.extname(__filename);

  const docs = __dirname + "/**/*" + ext;

  return swaggerJsDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API Rest",
        version,
        description: "A simple express library api rest",

        contact: {
          name: "Miguel Angel Pineda Vega",
          url: host,
        },
      },
      servers: [{ url: host + baseUrl }],
    },
    apis: [docs],
  });
}

/**
 * Types
 */
interface Opt extends Omit<OptModel, "schema"> {
  host: string;
}
