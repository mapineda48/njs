import { prepare, getTsLibVersion } from "@mapineda48/util";
import {
  name,
  version,
  main,
  author,
  license,
  bugs,
  repository,
  dependencies,
} from "../package.json";

prepare()
  .copy(["build", "README.md", "CHANGELOG.md", "LICENSE"])
  .copy({ src: "src/favicon.ico", dest: "dist/build/favicon.ico" })
  .package({
    name,
    version,
    author,
    license,
    bugs,
    repository,
    main,
    homepage: "https://github.com/mapineda48/njs/personal-webpack#readme",
    dependencies: {
      tslib: getTsLibVersion(),
    },
    peerDependencies: {
      express: dependencies.express,
    },
    peerDependenciesMeta: {
      "@types/express": {
        optional: true,
      },
    },
  })
  .complete()
  .catch((err) => console.log(err));
