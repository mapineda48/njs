#!/usr/bin/env node
export = null;

import { spawn } from 'child_process';

import prepare from '../lib/prepare';

const ng = require.resolve('@angular/cli/bin/ng');

const [, , main, ...rest] = process.argv;

if (!main) {
  process.exit();
}

(async () => {
  const restore = await prepare(main);

  const child = spawn('node', [ng, 'serve', ...rest], { stdio: 'inherit' });

  process.on('SIGINT', (code) => {
    child.kill(code);
  });

  child.on('exit', (code) => {
    restore()
      .catch(console.error)
      .finally(() => process.exit(code || 1));
  });
})().catch(console.error);
