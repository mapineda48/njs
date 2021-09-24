import dist from "mp48-util";
import {
  name,
  version,
  author,
  license,
  bugs,
  publishConfig,
  repository,
  dependencies,
  description,
  engines,
} from "./package.json";

const homepage = "https://github.com/mapineda48/njs/tree/master/cra#readme";

const dep = dist.dep({ ...dependencies, "react-scripts": ">=4" }, true);

dist()
  .copy(["README.md", "CHANGELOG.md", "LICENSE", "app/public/index.html"])
  .package({
    name,
    version,
    author,
    description,
    homepage,
    license,
    bugs,
    publishConfig,
    repository,
    bin: {
      mp: "./bin/index.js",
    },
    engines: { node: engines.node },
    dependencies: dep(["tslib", "commander", "ts-loader"]),
    peerDependencies: dep(["react-scripts"]),
  })
  .complete()
  .catch((err) => console.log(err));
