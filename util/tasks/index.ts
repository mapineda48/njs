import { prepare, getTsLibVersion } from "../lib";
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

prepare()
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
      glob: dependencies.glob,
    },
  })
  .copy(["README.md", "CHANGELOG.md", "LICENSE"])
  .complete()
  .catch((err: any) => console.log(err));
