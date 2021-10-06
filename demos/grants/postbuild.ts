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
  "https://github.com/mapineda48/njs/tree/master/demos/grants#readme";

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
    dependencies: dep([
      "react",
      "react-dom",
      "react-icons",
      "react-router-dom",
      "mp48-react",
      "axios",
      "query-string",
      "clsx"
    ]),
    peerDependencies: dep(["tslib", "express", "@types/express"]),
    peerDependenciesMeta: dep.meta(["@types/express"]),
  })
  .complete()
  .catch((err) => console.log(err));
