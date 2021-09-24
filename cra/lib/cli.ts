import { Command } from "commander";
import { version, description } from "../package.json";

import type { Options } from "./project";

/**
 * parse cli args
 */
export function parse(app: App) {
  const program = new Command();

  program
    .version(version)
    .arguments("[path]")
    .description(description)
    .option("-B, --build", "react-scripts build")
    .option("-T, --test", "react-scripts test")
    .option("-O, --output <path>", "output directory build")
    .option("-H, --template <path>", "directory html template")
    .option("-W, --worker <path>", "worker path")
    .option("-U, --url <path>", "the view of the Javascript / HTML page")
    .option("-A, --all-apps", "experimental build entrys")
    .action(app)
    .parse();
}

/**
 * Types
 */
export type App = (path: string, flag: Flag) => void;

export interface Flag extends Omit<Options, "entry"> {
  test?: boolean;
  build?: boolean;
  allApps?: boolean;
  output?: string;
  url?: string;
  worker?: string;
}
