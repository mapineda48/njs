import path from "path";
import fs from "fs-extra";

const src = path.resolve("build");

const dest = path.resolve("dist/build");

fs.copySync(src, dest, { overwrite: true });
