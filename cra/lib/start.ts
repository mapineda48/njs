import * as fs from "fs-extra";
import { resolve } from "path";
import { cra } from "./cra";
import { craJson, isNextProject } from "./project";
import { project } from "./paths";

export function start(app: string) {
  if (app) {
    if (fs.existsSync(app)) {
      cra.paths({ appIndexJs: resolve(app) });
    }

    const appIndexJs = craJson?.app?.[app]?.entry;

    if (appIndexJs) {
      cra.paths({ appIndexJs: resolve(appIndexJs) });
    }
  } else if (craJson.main) {
    const appIndexJs = craJson?.app?.[craJson.main]?.entry;

    if (appIndexJs) {
      cra.paths({ appIndexJs: resolve(appIndexJs) });
    }
  }

  if (isNextProject()) {
    cra.paths(({ appPublic, ...rest }) => {
      return {
        ...rest,
        appHtml: project.appHtml,
        appPublic: fs.existsSync(appPublic) ? appPublic : project.appPublic,
      };
    });
  }

  cra.start();
}
