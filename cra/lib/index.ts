import * as fs from "fs-extra";
import * as cli from "./cli";
import { start } from "./start";
import { build } from "./build";

export function main() {
  cli.parse(function run(path, opt) {
    if (!opt.build) return start(path);
    build(path, opt);
  });
}
