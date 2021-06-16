import { Command } from "commander";
import { version, description } from "../package.json";

/**
 * parse cli args
 */
export function parse(fn: Fn) {
  const program = new Command();

  program
    .version(version)
    .arguments("[path]")
    .description(description)
    .option("-B, --build", "react-scripts build")
    .option("-O, --output <path>", "output directory build")
    .option("-U, --url <path>", "the view of the Javascript / HTML page")
    .option("-A, --all-apps", "experimental build entrys")
    .action(fn)
    .parse();
}

/**
 * Types
 */
export type Fn = (path: string, options: CliOptions) => void;

export interface CliOptions extends Options {
  build?: boolean;
  allApps?: boolean;
}

export interface Options {
  output?: string;
  url?: string;
}
