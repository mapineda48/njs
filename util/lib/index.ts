import path from "path";
import fs from "fs-extra";

function create(path = "dist") {
  const tasks: Task[] = [];

  let pckg: Task;

  const builder = {
    package(data: any) {
      pckg = () => createPckgDist(path, data);
      return builder;
    },
    copy(files: Files) {
      if (Array.isArray(files)) {
        files.forEach((file) => tasks.push(() => copy(path, file)));
      } else {
        tasks.push(() => copy(path, files));
      }

      return builder;
    },

    async do() {
      tasks.push(pckg);

      await Promise.all(tasks.map((task) => task()));

      tasks.length = 0;

      return;
    },
  };

  return builder;
}

create.getTsLibVersion = getTsLibVersion;

function getTsLibVersion() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require("tslib/package.json");

  return "^" + version;
}

function isString(val: any): val is string {
  return typeof val === "string";
}

/**
 * Create package json to be use production
 * @param pckg
 */
async function createPckgDist(dir: string, pckg: any) {
  const file = path.resolve(dir, "package.json");

  await fs.outputJSON(file, pckg, { spaces: 2 });
}

/**
 * Copy Files
 */
async function copy(dir: string, file: File) {
  if (isString(file)) {
    const src = path.resolve(file);
    const dest = path.resolve(dir, file);

    await fs.copy(src, dest, { overwrite: true });
  } else {
    const src = path.resolve(file.src);
    const dest = path.resolve(dir, file.dest);

    await fs.copy(src, dest, { overwrite: true });
  }
}

export = create;

/**
 * Types
 */
type Task = () => Promise<void>;

type File = { src: string; dest: string } | string;

type Files = File | File[];
