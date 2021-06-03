import { prepare } from "mapineda48-util";
import {
  name,
  version,
  main,
  author,
  license,
  bugs,
  repository,
  dependencies,
  publishConfig,
} from "../package.json";

const homepage =
  "https://github.com/mapineda48/njs/tree/master/personal-webpack#readme";

const dep = prepare.dep.withTs(dependencies);

prepare()
  .copy(["build", "README.md", "CHANGELOG.md", "LICENSE"])
  .copy({ src: "src/favicon.ico", dest: "dist/build/favicon.ico" })
  .package({
    name,
    version,
    author,
    license,
    bugs,
    publishConfig,
    repository,
    main,
    homepage,
    dependencies: dep.select(["tslib"]),
    peerDependencies: dep.select(["express", "@types/express"]),
    peerDependenciesMeta: dep.select.meta(["@types/express"]),
  })
  .complete()
  .catch((err) => console.log(err));
