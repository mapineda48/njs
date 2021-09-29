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

const homepage =
  "https://github.com/mapineda48/njs/tree/master/demos/sigma#readme";

const dep = dist.dep(dependencies, true);

dist()
  .copy(["README.md", "CHANGELOG.md", "LICENSE", "view/build"])
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
    peerDependencies: dep([
      "tslib",
      "express",
      "@types/express",
      "pg",
      "@types/pg",
    ]),
    peerDependenciesMeta: dep.meta(["@types/express", "@types/pg"]),
  })
  .complete()
  .catch((err) => console.log(err));
