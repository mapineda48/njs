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

const homepage = "https://github.com/mapineda48/njs/tree/master/personal#readme";

const dep = prepare.dep.withTs(dependencies);

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
    homepage,
    publishConfig,
    dependencies: dep.select(["tslib", "jsonwebtoken"]),
    peerDependencies: dep.select(["express", "@types/express", "socket.io"]),
    peerDependenciesMeta: dep.select.meta(["@types/express"]),
  })
  .complete()
  .catch((err) => console.log(err));
