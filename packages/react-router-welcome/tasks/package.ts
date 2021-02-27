import path from "path";
import fs from "fs-extra";
import pckg from "../package.json";
import { version as tslib } from "tslib/package.json";

const { name, version, author, license, bugs, repository, dependencies } = pckg;

const homepage =
  "https://github.com/mapineda48/djs/packages/react-router-welcome#readme";

const json = path.resolve("dist", "package.json");

fs.outputJSONSync(json, {
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
});
