import path from "path";

export const root = {
  package: path.resolve("package.json"),
  craJson: path.resolve("cra.json"),
};

export const project = {
  appIndexNull: resolve("public/index.js"),
  appPublic: resolve("public"),
  appHtml: resolve("public/index.html"),
};

function resolve(...args: string[]) {
  return path.join(__dirname, "..", ...args);
}
