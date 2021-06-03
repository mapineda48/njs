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

const homepage =
  "https://github.com/mapineda48/njs/tree/master/welcome-react-router#readme";

const inDocker = process.argv.includes("--docker");

const dep = prepare.dep.withTs(dependencies);

const distDep = dep.select(["tslib"]);

const peerDep = dep.select([
  "express",
  "pg",
  "redis",
  "react",
  "react-dom",
  "react-router-dom",
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
          main: "bin/index.js",
          scripts: {
            start: "node bin/index.js",
          },
          dependencies: {
            ...distDep,
            ...dep.select(["morgan"]),
            ...peerDep,
          },
        }
      : {
          dependencies: distDep,
          peerDependencies: {
            ...peerDep,
            ...dep.select(["@types/express", "@types/pg", "@types/redis"]),
          },
          peerDependenciesMeta: dep.select.meta([
            "@types/express",
            "@types/pg",
            "@types/redis",
          ]),
        }),
  })
  .complete()
  .catch((err) => console.log(err));
