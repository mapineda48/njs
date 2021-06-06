#!/usr/bin/env node

export = null;

import path from "path";
import fs from "fs-extra";
import { execSync } from "child_process";

/**
 * Files
 */
const LOCK = path.resolve("yarn.lock");
const PCKG = path.resolve("package.json");
const YARNRC = path.resolve(".yarnrc");

/**
 * Commnands
 */
const GIT_STATUS = "git status . -s";

const RELEASE =
  "yarn version && cd dist && npm publish && git push && git push --tags";

/**
 * Constants
 */
const ERROR_YARN = 'missing "yarn" check: https://yarnpkg.com/';
const ERROR_COMMIT = "\nSome files are missing to be confirmed\n";

/**
 *Release
 */
if (!fs.existsSync(LOCK)) {
  console.error(ERROR_YARN);
  process.exit();
}

const status = execSync(GIT_STATUS).toString();

if (status.length) {
  console.error(ERROR_COMMIT);
  process.exit();
}

console.log(RELEASE);

const pckg = fs.readJSONSync(PCKG);

/**
 * https://classic.yarnpkg.com/en/docs/cli/version/#toc-git-tags
 * https://github.com/sindresorhus/np/issues/253
 */
fs.outputFileSync(YARNRC, `version-tag-prefix "${pckg.name}@"`);

try {
  execSync(RELEASE, { stdio: "inherit" });
} catch (error) {
  console.log(error);
} finally {
  fs.removeSync(YARNRC);
}
