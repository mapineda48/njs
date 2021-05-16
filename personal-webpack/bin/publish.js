const path = require("path");
const fs = require("fs-extra");
const { execSync } = require("child_process");
const pckg = require("../package.json");

/**
 * https://github.com/features/packages
 * https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-package-registry
 * https://github.com/Codertocat/hello-world-npm
 *
 * Warning this file should be load from packages management
 * npm / yarn
 */

const root = path.join(__dirname, "..");

const dist = path.resolve("dist");

const build = path.resolve("build");

const files = [
  build,
  path.resolve("web", "favicon.ico"),
  path.resolve("view"),
  path.resolve("README.md"),
  path.resolve("LICENSE"),
];

const builds = [
  pckg.scripts["build:web"],
  pckg.scripts["build:web:module"],
  pckg.scripts["ssr"],
  pckg.scripts["build:server"],
];

fs.removeSync(dist);
fs.removeSync(build);

builds.forEach(execIt);

/**
 * Packages Json Publish
 */
const json = path.join(dist, "package.json");

delete pckg.private;
delete pckg.scripts;
delete pckg.devDependencies;
delete pckg.eslintConfig;
delete pckg.browserslist;
delete pckg.nodemonConfig;

pckg.main = "router/index.js";

fs.outputJSONSync(json, pckg);

/**
 * Preserve Files
 */
files.forEach((file) => {
  const dest = file.replace(root, dist);
  fs.copySync(file, dest);
});

/**
 * Only pack packages
 * https://docs.npmjs.com/cli-commands/pack.html
 */
if (process.argv.includes("--pack")) {
  execIt("npm pack", { cwd: dist });
  process.exit();
}

/**
 * Publish
 * https://docs.npmjs.com/cli/publish
 */
execIt("npm publish", { cwd: dist });

fs.removeSync(dist);

function execIt(command, opt = {}) {
  execSync(command, { ...opt, stdio: "inherit" });
}
