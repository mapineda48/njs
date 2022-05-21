import dist from 'mp48-util';
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
  devDependencies,
  engines,
} from './package.json';

const homepage = 'https://github.com/mapineda48/njs/tree/master/cra#readme';

const dep = dist.dep(dependencies, true);

const depDev = dist.dep(devDependencies);

dist()
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
      mp: './bin/index.js',
    },
    engines: { node: engines.node },
    dependencies: dep(['tslib', 'strip-json-comments', 'fs-extra']),
    peerDependencies: depDev(['@angular/cli']),
  })
  .complete()
  .catch((err) => console.log(err));
