import * as fs from "fs-extra";
import * as cli from "./cli";
import { start } from "./start";
import { build } from "./build";

export function main() {
  cli.parse(function run(path, opt) {
    try {
      if (!opt.build) return start(path);
      build(path, opt);
    } catch (error: any) {
      if (error.ups) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  });
}
