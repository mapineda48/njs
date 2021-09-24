#!/usr/bin/env node

import path from "path";
import fs from "fs-extra";
import glob from "glob";
import { execSync } from "child_process";

const [, , dir = ""] = process.argv;

const version = [0, 0, Date.now()].join(".");

const root = path.resolve(dir);

if (!fs.existsSync(root)) {
  console.error(`not found "${root}"`);
  process.exit(1);
}

const pckg = path.resolve(root, "package.json");

if (!fs.existsSync(pckg)) {
  console.error(`not found "${pckg}"`);
  process.exit(1);
}

const data = fs.readJSONSync(pckg);

console.log(`found package "${data.name}"`);

/**
 * Clear old packs
 */
const olds = glob.sync(`${root}/*.tgz`);

if (olds.length) {
  console.log("remove old packs");
  olds.forEach((file) => fs.removeSync(file));
}

console.log(`set version "${version}"`);

fs.outputJSONSync(pckg, { ...data, version, private: true }, { spaces: 2 });

execSync("npm pack", { cwd: root, stdio: "inherit" });

export = null;
