import path from "path";
import fs from "fs-extra";
import glob from "glob";

export function prepare(path = "dist") {
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

    copyGlob(pattern: string | string[]) {
      let matches: string[];

      if (isString(pattern)) {
        matches = glob.sync(pattern);
      } else {
        matches = pattern
          .map((pattern) => glob.sync(pattern))
          .reduce((prev, curr) => [...prev, ...curr], []);
      }

      builder.copy(matches);

      return builder;
    },

    async complete() {
      tasks.push(pckg);

      await Promise.all(tasks.map((task) => task()));

      tasks.length = 0;

      return;
    },
  };

  return builder;
}

export function getTsLibVersion() {
  const current = require.resolve("tslib/package.json", {
    paths: [path.resolve()],
  });

  console.log(`tslib version was obtained from "${current}"`);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require(current);

  return "^" + version;
}

function isString(val: any): val is string {
  return typeof val === "string";
}

/**
 * Create package json to be use production
 * @param pckg
 */
export async function createPckgDist(dir: string, pckg: any) {
  const file = path.resolve(dir, "package.json");

  await fs.outputJSON(file, pckg, { spaces: 2 });
}

/**
 * Copy Files
 */
export async function copy(dir: string, file: File) {
  const { src, dest } = parseFile(dir, file);

  await fs.copy(src, dest, { overwrite: true });
}

export function parseFile(dir: string, file: File) {
  if (!isString(file)) {
    const src = path.resolve(file.src);
    const dest = path.resolve(file.dest);

    return { src, dest };
  }

  const root = path.resolve();

  const src = path.resolve(file);

  const dest = path.resolve(dir);

  return {
    src,
    dest: src.replace(root, dest),
  };
}

/**
 * Types
 */
type Task = () => Promise<void>;

type File = { src: string; dest: string } | string;

type Files = File | File[];
