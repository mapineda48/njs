import dist from "./lib";
import {
  name,
  version,
  author,
  homepage,
  license,
  main,
  engines,
  bin,
  bugs,
  publishConfig,
  repository,
  dependencies,
} from "./package.json";

const dep = dist.dep(dependencies, true);

dist()
  .package({
    name,
    version,
    author,
    homepage,
    license,
    main,
    bin,
    engines,
    bugs,
    publishConfig,
    repository,
    dependencies: dep(["tslib", "fs-extra", "glob"]),
  })
  .copy(["README.md", "CHANGELOG.md", "LICENSE"])
  .complete()
  .catch((err: any) => console.log(err));
