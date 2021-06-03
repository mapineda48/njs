import { prepare } from "mapineda48-util";
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
} from "../package.json";

const inDocker = process.argv.includes("--docker");

const homepage = "https://github.com/mapineda48/njs/tree/master/grants#readme";

const dep = prepare.dep.withTs(dependencies);

const distDep = dep.select(["tslib", "query-string", "clsx"]);

const peerDep = dep.select([
  "express",
  "axios",
  "react",
  "react-dom",
  "react-router-dom",
  "react-icons",
  "mapineda48-react",
]);

prepare()
  .copy(["build", "README.md", "CHANGELOG.md", "LICENSE"])
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
    ...(inDocker
      ? {
          private: true,
          main: "bin/index.js",
          scripts: {
            start: "node bin/index.js",
          },
          dependencies: {
            ...peerDep,
            ...distDep,
            ...dep.select(["morgan"]),
          },
        }
      : {
          dependencies: distDep,
          peerDependencies: { ...peerDep, ...dep.select(["@types/express"]) },
          peerDependenciesMeta: dep.select.meta(["@types/express"]),
        }),
  })
  .complete()
  .catch((err) => console.log(err));
