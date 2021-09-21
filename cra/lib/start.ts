import * as fs from "fs-extra";
import { resolve } from "path";
import { cra } from "./cra";
import { getCraConfig, isNextProject } from "./project";
import { project, resolveApp } from "./paths";

export function start(app: string) {
  const craJson = getCraConfig();

  if (app) {
    if (fs.existsSync(app)) {
      cra.paths({ appIndexJs: resolve(app) });
    } else {
      const appIndexJs = craJson?.app?.[app]?.entry;

      if (appIndexJs) {
        cra.paths({ appIndexJs: resolveApp(appIndexJs) });
      }
    }
  } else if (craJson.main) {
    const appIndexJs = craJson?.app?.[craJson.main]?.entry;

    if (appIndexJs) {
      cra.paths({ appIndexJs: resolveApp(appIndexJs) });
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
