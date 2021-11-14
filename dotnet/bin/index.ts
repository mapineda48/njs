#!/usr/bin/env node
export = null;

import { spawn } from "child_process";
import glob from "glob";
import fs from "fs-extra";
import { version } from "../package.json";

const [, , main, ...rest] = process.argv;

if (!main) {
  process.exit();
}

if (main === "version") {
  console.log(version);
  process.exit();
}

const [project] = glob.sync("*.csproj");

const data = fs.readFileSync(project, "utf-8");

const regStart = /\<StartupObject\>.*?\<\/StartupObject\>/i;

const existStart = regStart.test(data);

if (!existStart) {
  console.log("not found tag StartupObject");
  process.exit(1);
}

fs.outputFileSync(
  project,
  data.replace(regStart, `<StartupObject>${main}</StartupObject>`)
);

// fs.outputFileSync(
//   project,
//   data.replace(
//     "<PropertyGroup>",
//     `<PropertyGroup><StartupObject>${main}</StartupObject>`
//   )
// );

const dotnet = spawn("dotnet", ["watch", "run", ...rest], { stdio: "inherit" });

process.on("SIGINT", (code) => {
  dotnet.kill(code);
});

dotnet.on("exit", (code) => {
  fs.outputFile(project, data)
    .catch(console.error)
    .finally(() => process.exit(code || 1));
});
