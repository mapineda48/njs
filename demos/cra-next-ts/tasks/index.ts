import { prepare } from "mapineda48-util";
import {
  name,
  version,
  author,
  license,
  bugs,
  publishConfig,
  repository,
  dependencies,
  description,
  engines,
} from "../package.json";

const homepage =
  "https://github.com/mapineda48/njs/tree/master/cra-next-ts#readme";

const dep = prepare.dep.withTs(dependencies);

prepare()
  .copy(["README.md", "CHANGELOG.md", "LICENSE", ".next"])
  .package({
    name,
    version,
    author,
    description,
    homepage,
    license,
    bugs,
    publishConfig,
    repository,
    scripts: {
      start: "next start",
    },
    engines: { node: engines.node },
    dependencies: dep.select(["next", "react", "react-dom"]),
    peerDependencies: dep.select([]),
  })
  .complete()
  .catch((err) => console.log(err));
