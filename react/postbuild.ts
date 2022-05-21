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
  engines,
} from "./package.json";

const homepage = "https://github.com/mapineda48/njs/tree/master/react#readme";

const dep = dist.dep(dependencies, true);

dist()
  .copy(["README.md", "CHANGELOG.md", "LICENSE", ".npmrc"])
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
    dependencies: dep(["tslib"]),
    peerDependencies: dep(["react", "react-dom", "@popperjs/core"]),
  })
  .complete()
  .catch((err) => console.log(err));
