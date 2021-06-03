import path from "path";
import fs from "fs-extra";
import glob from "glob";

export function setDepWithTs<T>(dependecies: T) {
  const ext = { tslib: getTsLibVersion() };

  return setDepFrom({ ...ext, ...dependecies });
}

/**
 * Select dependecies from object
 * @param dep dependecies
 * @returns
 */
export function setDepFrom<T>(dep: T) {
  const _dep = { ...dep };

  const select = (keys: (keyof T)[]): Partial<T> => {
    return Object.fromEntries(
      Object.entries(_dep).filter(([dep]: any) => keys.includes(dep))
    ) as any;
  };

  select.meta = (keys: (keyof T)[]): Partial<T> => {
    const opt = {
      optional: true,
    };

    return Object.fromEntries(
      Object.entries(_dep)
        .filter(([dep]: any) => keys.includes(dep))
        .map(([dep]) => [dep, opt])
    ) as any;
  };

  return {
    select,
    set(key: keyof T, val: string | ((val: SetValMap) => string)) {
      const current: string = (_dep as any)[key];

      if (typeof val !== "function") {
        (_dep as any)[key] = val;

        return;
      }

      const _val = {
        current() {
          return current;
        },
        exact() {
          return current.replaceAll("^", "");
        },
      };

      (_dep as any)[key] = val(_val);
    },
  };
}

setDepFrom.withTs = setDepWithTs;

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

prepare.dep = setDepFrom;

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

/**
 * Try to get the tslib version of the current project.
 * @returns tslib version
 */
export function getTsLibVersion() {
  const pckg = path.resolve("node_modules/tslib/package.json");

  const notFound = "unknown";

  if (!fs.existsSync(pckg)) {
    return notFound;
  }

  console.log(`tslib version was obtained from "${pckg}"`);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const data = fs.readFileSync(pckg, "utf-8");

  const { version } = JSON.parse(data);

  return version ? "^" + version : notFound;
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

  const copy = () =>
    fs.copy(src, dest, {
      overwrite: true,
      errorOnExist: false,
      recursive: true,
    });

  try {
    await copy();
  } catch (error) {
    /**
     * Under investigation uncontrolled error, this is a temporary solution
     * https://github.com/jprichardson/node-fs-extra/issues/699
     */
    if (error.syscall === "mkdir" && error.code === "EEXIST") {
      await copy();
    } else {
      throw error;
    }
  }

  await fs.copy(src, dest, {
    overwrite: true,
    errorOnExist: false,
    recursive: true,
  });
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
interface SetValMap {
  exact: () => string;
  current: () => string;
}

type Task = () => Promise<void>;

type File = { src: string; dest: string } | string;

type Files = File | File[];

type Glob = { include: string; exclude: string };

type Pattern = string | string[] | Glob;
