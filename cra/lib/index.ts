import * as cli from "./cli";
import * as error from "./error";
import { app } from "./app";

export function main() {
  cli.parse(function run(path, opt) {
    try {
      app(path, opt);
    } catch (err: any) {
      error.parse(err)
    }
  });
}
