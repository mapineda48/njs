#!/usr/bin/env node
export = null;

import path from "path";
import { spawn } from "child_process";
import glob from "glob";
import fs from "fs-extra";
import { version } from "../package.json";

const [, , main, ...rest] = process.argv;

if (!main) {
  console.log('usage:\n\n mp48 <mainClassName>');
  process.exit();
}

if (main === "version") {
  console.log(version);
  process.exit();
}

const buildFile = path.resolve("build.gradle");

const data = fs.readFileSync(buildFile, "utf-8");

const regStart = /mainClassName = '.*?'/i;

const existStart = regStart.test(data);

if (!existStart) {
  console.log("not found springboot mainClassName, please first set default in build.gradle");
  process.exit(1);
}

fs.outputFileSync(
  buildFile,
  data.replace(regStart, `mainClassName = '${main}'`)
);

const bin = path.resolve("gradlew");

rest.push("--spring.main.web-application-type=NONE");

const gradle = spawn(bin, ["bootRun", `--args="${rest.join(" ")}"`], {
  stdio: "inherit",
});

process.on("SIGINT", (code) => {
  gradle.kill(code);
});

gradle.on("exit", (code) => {
  fs.outputFile(buildFile, data)
    .catch(console.error)
    .finally(() => process.exit(code || 1));
});
