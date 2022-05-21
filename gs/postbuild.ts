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
} from "./package.json";

const homepage = "https://github.com/mapineda48/njs/tree/master/gs#readme";

const dep = dist.dep(dependencies, true);

dist()
  .copy(["README.md", "LICENSE", "CHANGELOG.md"])
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
    engines: {
      node: ">=14",
    },
    bin: {
      mp48: "./bin/index.js",
    },
    dependencies: dep(["tslib", "fs-extra", "glob"]),
  })
  .complete()
  .catch((err) => console.log(err));
