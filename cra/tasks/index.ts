import { prepare } from "mapineda48-util";
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
} from "../package.json";

const homepage = "https://github.com/mapineda48/njs/tree/master/cra#readme";

const dep = prepare.dep.withTs(dependencies);

dep.set("react-scripts", (val) => ">=4");

prepare()
  .copy(["README.md", "CHANGELOG.md", "LICENSE", "app/public"])
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
    dependencies: dep.select(["tslib", "commander", "ts-loader"]),
    peerDependencies: dep.select(["react-scripts"]),
  })
  .complete()
  .catch((err) => console.log(err));
