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

const homepage = "https://github.com/mapineda48/njs/tree/master/react#readme";

const dep = prepare.dep.withTs(dependencies);

prepare()
  .copy(["README.md", "CHANGELOG.md", "LICENSE"])
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
    engines: { node: engines.node },
    exports: {
      "./*": {
        import: "./*/index.js",
        require: "./cjs/*/index.js",
      },
    },
    dependencies: dep.select(["tslib"]),
    peerDependencies: dep.select(["react", "react-dom", "@popperjs/core"]),
  })
  .complete()
  .catch((err) => console.log(err));
