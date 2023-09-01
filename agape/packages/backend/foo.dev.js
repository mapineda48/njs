const path = require("path");


const res = path.relative(path.resolve("integration/agape/client/employee/index.ts"), "tmp");

console.log(res);