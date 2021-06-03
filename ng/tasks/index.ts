import { prepare } from 'mapineda48-util';
import {
  name,
  version,
  author,
  license,
  bugs,
  publishConfig,
  repository,
  dependencies,
  devDependencies,
  description,
  engines,
} from '../package.json';

const homepage = 'https://github.com/mapineda48/njs/tree/master/ng#readme';

const dep = prepare.dep.withTs(dependencies);

const devDep = prepare.dep(devDependencies);

prepare()
  .copy(['README.md', 'CHANGELOG.md', 'LICENSE'])
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
    bin: {
      ['mapineda-ng']: './bin/index.js',
    },
    engines: { node: engines.node },
    dependencies: dep.select(['tslib', 'strip-json-comments']),
    peerDependencies: devDep.select(['@angular/cli']),
  })
  .complete()
  .catch((err) => console.log(err));
