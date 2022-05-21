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

const homepage =
  "https://github.com/mapineda48/njs/tree/master/demos/api-rest#readme";

const dep = dist.dep(dependencies, true);

dist()
  .copy(["README.md", "CHANGELOG.md", "LICENSE"])
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
    dependencies: dep(["tslib", "swagger-jsdoc", "swagger-ui-express"]),
    peerDependencies: dep(["express", "@types/express", "sequelize"]),
    peerDependenciesMeta: dep.meta(["@types/express"]),
  })
  .complete()
  .catch((err) => console.log(err));
