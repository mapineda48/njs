import path from "path";
import fs from "fs-extra";

const files: File[] = [];

files.push({
  src: "README.md",
  dest: "dist/README.md",
});

files.push({
  src: "CHANGELOG.md",
  dest: "dist/CHANGELOG.md",
});

files.push({
  src: "build",
  dest: "dist/build",
});

files.push({
  src: "sql",
  dest: "dist/sql",
});

files.forEach((file) => {
  const src = path.resolve(file.src);
  const dest = path.resolve(file.dest);

  try {
    fs.copySync(src, dest, { overwrite: true });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Types
 */
interface File {
  src: string;
  dest: string;
}
