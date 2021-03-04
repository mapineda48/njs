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
  .copy(["build", "README.md", "CHANGELOG.md", "LICENSE", "sql"])
  .package({
    name,
    version,
    author,
    license,
    bugs,
    repository,
    main,
    homepage: "https://github.com/mapineda48/djs/agape#readme",
    dependencies: {
      tslib: getTsLibVersion(),
      jsonwebtoken: dependencies.jsonwebtoken,
    },
    peerDependencies: {
      express: dependencies.express,
      pg: dependencies.pg,
    },
    peerDependenciesMeta: {
      "@types/express": {
        optional: true,
      },
      "@types/pg": {
        optional: true,
      },
    },
  })
  .complete();