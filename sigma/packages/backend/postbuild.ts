import fs from "fs-extra";
import { dependencies } from "./package.json";
import {
  name,
  version,
  description,
  repository,
  author,
  license,
  engines,
} from "../../package.json";

const pckg = {
  name,
  version,
  description,
  repository,
  author,
  license,
  engines,
  main: "bin/index.js",
  scripts: {
    start: "node bin/index.js",
  },
  dependencies,
};

const optionsJson = { spaces: 2 };

const settingProduction = { production: true, frontendPath: "frontend" };

fs.outputJSONSync("dist/package.json", pckg, optionsJson);

fs.outputJSONSync("dist/setting.json", settingProduction, optionsJson);

fs.moveSync("../frontend/build", "dist/frontend", { overwrite: true });

fs.copySync("./integration/index.js", "dist/integration/index.js");
