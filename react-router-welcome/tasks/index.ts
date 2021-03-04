import path from "path";
import fs from "fs-extra";
import { exec } from "child_process";
import globAsync from "glob";
import { version as tslib } from "tslib/package.json";
import {
  name,
  version,
  main,
  author,
  license,
  bugs,
  repository,
  dependencies,
} from "../package.json";

const [, , flag] = process.argv;

const file = {
  copy: ["build", "README.md", "CHANGELOG.md", "LICENSE"],
  remove: ["dist/build/**/*.ico"],
  json: path.resolve("dist", "package.json"),
};

const isTempPack = flag === "--pack-temp";

(async () => {
  const pckg = await createPckgDist({
    name,
    version: isTempPack ? await upVersion(version) : version,
    author,
    license,
    bugs,
    repository,
    main,
    homepage: "https://github.com/mapineda48/djs/react-router-welcome#readme",
    dependencies: {
      tslib: "^" + tslib,
      react: dependencies.react,
      "react-dom": dependencies["react-dom"],
      "react-router-dom": dependencies["react-router-dom"],
    },
    peerDependencies: {
      express: dependencies.express,
    },
    peerDependenciesMeta: {
      "@types/express": {
        optional: true,
      },
    },
  });

  await remove(file.remove);

  await copy(file.copy);

  if (isTempPack) {
    await execIt("cd dist;npm pack");
    console.log(`pack version "${pckg.version}"`);
  }
})().catch((err) => console.log(err));

/**
 * Lib
 */

/**
 * Up version package
 */
async function upVersion(version: string) {
  let pipe: number[];
  try {
    const { version } = await fs.readJSON(file.json);
    pipe = version.split(".").map((val: string) => parseInt(val));
  } catch (error) {
    pipe = version.split(".").map((val) => parseInt(val));
  }

  pipe[2] = pipe[2] + 1;

  return pipe.join(".");
}

/**
 * Create package json to be use production
 * @param pckg
 */
async function createPckgDist<T>(pckg: T) {
  try {
    await fs.outputJSON(file.json, pckg, { spaces: 2 });
    return pckg;
  } catch (error) {
    console.log(error);
  }
}

/**
 * remove files
 * @param patterns glob
 */
async function remove(patterns: string[]) {
  try {
    const matches = await Promise.all(patterns.map((pattern) => glob(pattern)));

    const files = matches.reduce((prev, curr) => [...prev, ...curr], []);

    await Promise.all(files.map((file) => fs.remove(file)));
  } catch (error) {
    console.log(error);
  }
}

/**
 * Copy Files
 */
async function copy(files: string[]) {
  try {
    const paths = files.map((file) => {
      return {
        src: path.resolve(file),
        dest: path.resolve("dist", file),
      };
    });

    await Promise.all(
      paths.map(({ src, dest }) => fs.copy(src, dest, { overwrite: true }))
    );
  } catch (error) {
    console.log(error);
  }
}

function glob(pattern: string) {
  return new Promise<string[]>((res, rej) => {
    globAsync(pattern, (err, matches) => {
      if (err) return rej(err);
      res(matches);
    });
  });
}

async function execIt(command: string) {
  return new Promise<void>((res, rej) => {
    exec(command, (err) => {
      if (err) return rej(err);
      res();
    });
  });
}
