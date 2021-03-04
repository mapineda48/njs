import create, { getTsLibVersion } from "../lib";
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
} from "../package.json";

create()
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
    dependencies: {
      tslib: getTsLibVersion(),
      "fs-extra": dependencies["fs-extra"],
    },
  })
  .copy(["README.md", "CHANGELOG.md", "LICENSE"])
  .do()
  .catch((err: any) => console.log(err));
