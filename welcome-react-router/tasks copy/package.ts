import path from "path";
import fs from "fs-extra";
import { version as tslib } from "tslib/package.json";
import {
  name,
  version,
  author,
  license,
  bugs,
  repository,
  dependencies,
} from "../package.json";

const homepage = "https://github.com/mapineda48/djs/welcome-react-router#readme";

const pckg = {
  name,
  version,
  author,
  license,
  bugs,
  repository,
  homepage,
  main: "router",
  dependencies: {
    tslib: "^" + tslib,
    react: dependencies.react,
    "react-dom": dependencies["react-dom"],
    "react-router-dom": dependencies["react-router-dom"],
  },
  peerDependencies: {
    express: dependencies.express,
  },
  peerDependenciesMeta: {
    "@types/express": {
      optional: true,
    },
  },
};

const file = path.resolve("dist", "package.json");

fs.outputJSONSync(file, pckg, { spaces: 2 });
