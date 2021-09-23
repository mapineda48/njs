import path from "path";
import fs from "fs-extra";

/**
 * Select dependecies from object
 * @param dep dependecies
 * @param tslib get tslib version
 * @returns
 */
export function setDepFrom<T, D = T & { tslib: string }>(
  dep: T,
  tslib: true
): {
  (keys: (keyof D)[]): Partial<D>;
  meta(keys: (keyof D)[]): Partial<D>;
};
export function setDepFrom<T>(dep: T): {
  (keys: (keyof T)[]): Partial<T>;
  meta(keys: (keyof T)[]): Partial<T>;
};
export function setDepFrom(dep: any, tslib?: any) {
  const _dep = tslib ? { ...dep, tslib: getTsLibVersion() } : { ...dep };

  const select = (keys: string[]) => {
    return Object.fromEntries(
      Object.entries(_dep).filter(([key]: any) => keys.includes(key))
    ) as any;
  };

  select.meta = (keys: string[]) => {
    const opt = {
      optional: true,
    };

    return Object.fromEntries(
      Object.entries(_dep)
        .filter(([key]: any) => keys.includes(key))
        .map(([key]) => [key, opt])
    ) as any;
  };

  return select;
}

export class Builder {
  private path: string;

  private tasks: Task[] = [];

  private existsPackg = false;

  constructor(_path: string) {
    this.path = path.resolve(_path);
  }

  private resolve(...paths: string[]) {
    return path.resolve(this.path, ...paths);
  }

  package(data: any) {
    if (!this.existsPackg) {
      const file = this.resolve("package.json");

      this.tasks.push(() => fs.outputJSON(file, data, { spaces: 2 }));

      this.existsPackg = true;
    }
    return this;
  }

  private parseFile(file: File) {
    if (!isString(file))
      return { src: path.resolve(file.src), dest: this.resolve(file.dest) };

    return { src: path.resolve(file), dest: this.resolve(file) };
  }

  private copyFile(file: File) {
    const { src, dest } = this.parseFile(file);

    return fs.copy(src, dest, {
      overwrite: true,
      errorOnExist: false,
      recursive: true,
    });
  }

  copy(val: File | File[]) {
    if (!Array.isArray(val)) {
      this.tasks.push(() => this.copyFile(val));
    } else {
      val.forEach((val) => this.tasks.push(() => this.copyFile(val)));
    }

    return this;
  }

  async complete() {
    if (!this.existsPackg) {
      console.log("missing package.json");
      return;
    }

    await Promise.all(this.tasks.map((task) => task()));

    /**
     * Clear tasks
     */
    this.tasks.length = 0;

    return;
  }
}

/**
 * Prepare distribution module
 * @param path path to module
 * @returns 
 */
export function init(path = "dist") {
  return new Builder(path);
}

init.dep = setDepFrom;

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
 * Types
 */
type Task = () => Promise<void>;

type File = { src: string; dest: string; root?: boolean } | string;

