#!/usr/bin/env node

import path from "path";
import fs from "fs-extra";
import { execSync } from "child_process";

const [bin, file, dir] = process.argv;

if (!dir) process.exit();

const version = [0, 0, Date.now()].join(".");

const root = path.resolve(dir);

const pckg = path.resolve(root, "package.json");

const data = fs.readJSONSync(pckg);

fs.outputJSONSync(pckg, { ...data, version, private: true }, { spaces: 2 });

console.log(`set version "${version}"`);

execSync("npm pack", { cwd: root, stdio: "inherit" });


export = null;
