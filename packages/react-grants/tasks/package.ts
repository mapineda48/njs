import path from 'path';
import fs from 'fs-extra';
import pckg from '../package.json';
import { version as tslib } from 'tslib/package.json';

const { name, version, author, license, bugs, repository, dependencies } = pckg;

const homepage =
  'https://github.com/mapineda48/djs/packages/react-gratnts#readme';

const json = path.resolve('dist', 'package.json');

fs.outputJSONSync(json, {
  name,
  version,
  author,
  license,
  bugs,
  repository,
  homepage,
  main: 'router',
  dependencies: {
    tslib: '^' + tslib,
  },
  peerDependencies: {
    express: dependencies.express,
  },
  peerDependenciesMeta: {
    '@types/express': {
      optional: true,
    },
  },
});
