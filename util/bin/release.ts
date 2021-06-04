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

const SUCESS_YARNRC = "succes create .yarnrc";

/**
 *Release
 */
if (!fs.existsSync(LOCK)) {
  console.error(ERROR_YARN);
  process.exit();
}

if (!fs.existsSync(YARNRC)) {
  const pckg = fs.readJSONSync(PCKG);

  fs.outputFile(PCKG, `version-tag-prefix "${pckg.name}@"`);

  console.log(SUCESS_YARNRC);
}

const status = execSync(GIT_STATUS).toString();

if (status.length) {
  console.error(ERROR_COMMIT);
  process.exit();
}

console.log(RELEASE);

execSync(RELEASE, { stdio: "inherit" });
