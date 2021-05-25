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
  .package({
    name,
    version,
    author,
    license,
    bugs,
    repository,
    main,
    homepage: "https://github.com/mapineda48/njs/personal#readme",
    dependencies: {
      tslib: getTsLibVersion(),
      jsonwebtoken: dependencies.jsonwebtoken,
    },
    peerDependencies: {
      express: dependencies.express,
      "socket.io": dependencies["socket.io"],
    },
    peerDependenciesMeta: {
      "@types/express": {
        optional: true,
      },
    },
  })
  .complete()
  .catch((err) => console.log(err));