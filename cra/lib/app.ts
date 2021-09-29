import * as fs from "fs-extra";
import { getCraConfig, isNextProject } from "./project";
import { cra } from "./cra";
import { resolve, resolveApp, project } from "./paths";
import {
  removeModuleScopePlugin,
  enabledTsPaths,
  prepareApps,
  mockWithAlias,
} from "./webpack";

import type { Flag } from "./cli";

export function app(path: string, cli: Flag) {
  const craJson = getCraConfig();

  if (craJson.root) {
    cra.root(craJson.root);
  }

  if (craJson?.ModuleScopePlugin === "off") {
    removeModuleScopePlugin();
    enabledTsPaths();
  }

  if (cli.output) {
    cra.paths({ appBuild: resolve(cli.output) });
  }
  if (cli.url) {
    cra.paths({ publicUrlOrPath: cli.url });
  }

  if (cli.template) {
    cra.paths({ appHtml: resolve(cli.template) });
  }

  if (cli.worker) {
    cra.paths({ swSrc: resolve(cli.worker) });
  }

  if (path) {
    if (fs.existsSync(path)) {
      cra.paths({ appIndexJs: resolve(path) });
    } else {
      const main = craJson?.app?.[path];

      const appIndexJs = main?.entry;

      if (appIndexJs) {
        cra.paths({ appIndexJs: resolveApp(appIndexJs) });

        if (main?.template) {
          const template = resolveApp(main.template);

          const inPublic = template.includes(cra.paths().appPublic);

          if (!inPublic) {
            throw new Error("html template must be in folder public");
          }

          cra.paths({ appHtml: resolveApp(main.template) });
        }
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

  if (cli.allApps && !path) {
    prepareApps(cli.url);
  }

  if (cli.build) {
    cra.build();
  } else if (cli.test) {
    console.log("tests still not implement");
  } else {
    if (cli.mock) {
      mockWithAlias(resolve(cli.mock));
    }

    cra.start();
  }
}
