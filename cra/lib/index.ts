import * as fs from "fs-extra";
import * as cli from "./cli";
import { start } from "./start";
import { build } from "./build";
import { isInApp } from "./error";
import { getCraConfig } from "./project";
import { cra } from "./cra";
import { resolveRoot } from "./paths";
import { removeModuleScopePlugin, enabledTsPaths } from "./plugins";

export function main() {
  cli.parse(function run(path, opt) {
    try {
      const craJson = getCraConfig();

      if (craJson.root) {
        cra.root(craJson.root);
      }

      if (craJson?.ModuleScopePlugin === "off") {
        removeModuleScopePlugin();
        enabledTsPaths();
      }

      if (opt.template) {
        cra.paths({ appHtml: resolveRoot(opt.template) });
      }

      if (opt.worker) {
        cra.paths({ swSrc: resolveRoot(opt.worker) });
      }

      if (opt.build) {
        build(path, opt);
      } else if (opt.test) {
        console.log("tests still not implement");
      } else {
        start(path);
      }
    } catch (err: any) {
      if (isInApp(err)) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  });
}
