import dist from "mp48-util";
import {
  name,
  version,
  description,
  author,
  license,
  engines,
  dependencies,
} from "./package.json";

const dep = dist.dep(dependencies, true);

dist()
  .copy(["README.md", "LICENSE", ".npmrc"])
  .package({
    name,
    version,
    description,
    author,
    license,
    engines: {
      node: "<=16"
    },
    scripts: {
      start: "node bin/index.js",
    },
    main: "bin",
    dependencies: dep([
      "@mapineda48/demos-api-rest",
      "@mapineda48/demos-grants",
      "@mapineda48/demos-sigma",
      "@mapineda48/personal",
      "@mapineda48/social",
      "express",
      "pg",
      "pg-hstore",
      "morgan",
      "redis",
      "helmet",
      "socket.io",
      'sequelize'
    ]),
  })
  .complete();
