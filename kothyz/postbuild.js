const fs = require("fs-extra");
const { name,
    version,
    description,
    repository,
    author,
    license,
    engines,
    dependencies } = require("./package.json");

const pckg = {
    name,
    version,
    description,
    repository,
    author,
    license,
    engines,
    dependencies,
    scripts: {
        start: "next start -p 8080",
    }
};

fs.outputJSONSync("dist/package.json", pckg, { spaces: 2 });

fs.moveSync(".next", "dist/.next", { overwrite: true });

fs.copySync("public", "dist/public", { overwrite: true });
