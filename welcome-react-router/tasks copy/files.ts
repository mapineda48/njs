import path from "path";
import fs from "fs-extra";
import glob from "glob";

const remove = ["dist/build/**/*.ico"];

const copy = ["build", "README.md", "CHANGELOG.md", "LICENSE"];

/**
 * Remove ununsed files
 */
remove
  .map((pattern) => {
    return glob.sync(pattern);
  })
  .reduce((prev, current) => {
    return [...prev, ...current];
  }, [])
  .forEach((file) => {
    const _file = path.resolve(file);

    fs.removeSync(_file);
  });

/**
 * Copy Files
 */
copy
  .map((src) => {
    return {
      src,
      dest: `dist/${src}`,
    };
  })
  .forEach((file) => {
    const src = path.resolve(file.src);
    const dest = path.resolve(file.dest);

    fs.copySync(src, dest, { overwrite: true });
  });
