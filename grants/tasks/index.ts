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
    homepage: "https://github.com/mapineda48/njs/grants#readme",
    dependencies: {
      tslib: getTsLibVersion(),
      axios: dependencies.axios,
      react: dependencies.react,
      "react-dom": dependencies["react-dom"],
      "react-router-dom": dependencies["react-router-dom"],
      "react-icons": dependencies["react-icons"],
      "mapineda-react": dependencies["mapineda-react"],
      "query-string": dependencies["query-string"],
      clsx: dependencies.clsx,
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
