import * as cli from "./cli";
import * as cra from "./cra";
import * as paths from "./paths";
import { parseError } from "./error";

export function main() {
  cli.parse(function run(path, opt) {
    try {
      if (!opt.build) {
        const config = paths.prepareStart(path);
        cra.start(config);
        return;
      }

      const config = paths.prepareBuild(path, opt);

      if (!Array.isArray(config)) {
        cra.build(config);
        return;
      }

      const [configs, url] = config;

      cra.builds(configs, url);
    } catch (error) {
      parseError(error);
    }
  });
}
