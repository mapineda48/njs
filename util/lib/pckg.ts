import path from "path";
import fs from "fs-extra";
import glob from "glob";

export class Builder {
  private path: string;

  private tasks: Task[] = [];

  private pckg: Task = null as any;

  constructor(path: string) {
    this.path = path;
  }

  package(data: any) {
    this.pckg = () => createPckgDist(this.path, data);
    return this;
  }

  copy(files: Files) {
    if (Array.isArray(files)) {
      files.forEach((file) => this.tasks.push(() => copy(this.path, file)));
    } else {
      this.tasks.push(() => copy(this.path, files));
    }

    return this;
  }

  copyGlob(pattern: Pattern, root = false) {
    const matches = globIt(pattern);

    matches.forEach((match) =>
      this.tasks.push(() => copy(this.path, match, root))
    );

    return this;
  }

  async complete() {
    this.tasks.push(this.pckg);

    await Promise.all(this.tasks.map((task) => task()));

    this.tasks.length = 0;

    return;
  }
}

export function prepare(path = "dist") {
  return new Builder(path);
}

export function globIt(pattern: Pattern) {
  if (Array.isArray(pattern)) {
    return pattern
      .map((pattern) => glob.sync(pattern))
      .reduce((prev, curr) => [...prev, ...curr], []);
  } else if (isString(pattern)) {
    return glob.sync(pattern);
  }

  const includes = glob.sync(pattern.include);

  const excludes = glob.sync(pattern.exclude);

  return includes.filter((include) => !excludes.includes(include));
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
export async function copy(dir: string, file: File, inRoot = false) {
  const { src, dest } = parseFile(dir, file, inRoot);

  await fs.copy(src, dest, { overwrite: true });
}

export function parseFile(dir: string, file: File, inRoot = false) {
  if (!isString(file)) {
    const src = path.resolve(file.src);
    const dest = path.resolve(file.dest);

    return { src, dest };
  }

  const [ext] = inRoot ? file.split("/") : [];

  const root = ext ? path.resolve(ext) : path.resolve();

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

type Glob = { include: string; exclude: string };

type Pattern = string | string[] | Glob;
