const path = require("path");

require("ts-node").register({ dir: __dirname, transpileOnly: true });
require(path.join(__dirname, "index.ts"));
