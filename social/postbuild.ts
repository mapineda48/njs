import dist from "mp48-util";

import {
  name,
  version,
  main,
  author,
  license,
  bugs,
  repository,
  dependencies,
  publishConfig,
} from "./package.json";

const homepage = "https://github.com/mapineda48/njs/tree/master/social#readme";

const dep = dist.dep(dependencies, true);

dist()
  .copy(["frontend/build", "README.md", "CHANGELOG.md", "LICENSE", ".npmrc"])
  .package({
    name,
    version,
    author,
    license,
    bugs,
    repository,
    main,
    homepage,
    publishConfig,
    dependencies: dep(["tslib", "jsonwebtoken", "web-push", "ms"]),
    peerDependencies: dep([
      "express",
      "@types/express",
      "socket.io",
      "helmet",
      "pg",
      "pg-hstore",
      "sequelize",
      "helmet"
    ]),
    peerDependenciesMeta: dep.meta(["@types/express"]),
  })
  .complete()
  .catch((err) => console.log(err));
