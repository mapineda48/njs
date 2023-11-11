const fs = require("fs-extra");

/**
 * Package
 */
const pckg = require("./package.json");

delete pckg.devDependencies;

pckg.scripts = {
  prestart: "node prestart.js",
  start: "next start",
};

fs.outputJSONSync("./dist/package.json", pckg, { spaces: 2 });

/**
 * Next
 */

fs.copySync("next.config.js", "dist/next.config.js", { overwrite: true });

fs.moveSync(".next", "dist/.next", { overwrite: true });
