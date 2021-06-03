#!/usr/bin/env node
export = null;

import { prepareBakup, overWrite, restoreBackup } from '../lib';

import { spawn } from 'child_process';

const restores = ['--restore-backup', '-R'];

const ng = require.resolve('@angular/cli/bin/ng');

const [, , main, ...rest] = process.argv;

if (!main) {
  process.exit();
}

(async () => {
  if (isRestore(main)) {
    await restoreBackup();
    return;
  }

  await prepareBakup();

  await overWrite(main);

  const child = spawn('node', [ng, 'serve', ...rest], { stdio: 'inherit' });

  process.on('SIGINT', (code) => {
    child.kill(code);
  });

  child.on('exit', (code) => {
    restoreBackup()
      .catch((err) => console.log(err))
      .finally(() => process.exit(code));
  });
})().catch((err) => console.log(err));

function isRestore(val: string) {
  return restores.includes(val);
}
