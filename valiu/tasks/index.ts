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
  devDependencies,
  publishConfig,
} from "../package.json";

const inDocker = process.argv.includes("--docker");

const homepage = "https://github.com/mapineda48/njs/tree/master/valiu#readme";

const dep = prepare.dep.withTs(dependencies);

const depDev = prepare.dep(devDependencies);

const distDep = dep.select(["tslib"]);

const peerDep = dep.select(["express", "pg", "socket.io"]);

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
            ...peerDep,
            ...dep.select(["morgan"]),
          },
        }
      : {
          dependencies: distDep,
          peerDependencies: {
            ...peerDep,
            ...depDev.select(["@types/pg", "@types/express"]),
          },
          peerDependenciesMeta: depDev.select.meta([
            "@types/express",
            "@types/pg",
          ]),
        }),
  })
  .complete()
  .catch((err) => console.log(err));
