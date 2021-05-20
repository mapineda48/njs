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
    homepage: "https://github.com/mapineda48/njs/valiu#readme",
    dependencies: {
      tslib: getTsLibVersion(),
      pg: dependencies.pg,
      "socket.io": dependencies["socket.io"],
    },
    peerDependencies: {
      express: dependencies.express,
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
  .complete()
  .catch((err) => console.log(err));
