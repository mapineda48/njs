import * as fs from "fs-extra";
import * as cli from "./cli";
import { start } from "./start";
import { build } from "./build";
import { isInApp } from "./error";
import { craJson } from "./project";
import { cra } from "./cra";
import { setRoot } from "./paths";
import { removeModuleScopePlugin } from "./plugins";

export function main() {
  cli.parse(function run(path, opt) {
    try {
      if (craJson.root) {
        cra.paths(setRoot(craJson.root));
      }

      if (craJson?.ModuleScopePlugin === "off") {
        removeModuleScopePlugin();
      }

      if (!opt.build) return start(path);
      build(path, opt);
    } catch (err: any) {
      if (isInApp(err)) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  });
}
