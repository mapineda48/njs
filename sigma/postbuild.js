const fs = require("fs-extra");

fs.moveSync("packages/backend/dist", "dist", { overwrite: true });
