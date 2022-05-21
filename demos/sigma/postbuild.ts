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
  .copy(["README.md", "CHANGELOG.md", "LICENSE", "frontend/build"])
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
    main: "lib",
    peerDependencies: dep(["tslib", "express", "@types/express", "sequelize"]),
    peerDependenciesMeta: dep.meta(["@types/express"]),
  })
  .complete()
  .catch((err) => console.log(err));
