const glob = require("glob");
const fs = require("fs-extra");

console.log("cleaning...");

const patterns = ["node_modules", "yarn.lock"];

[...patterns, "build", "dist", ".eslintcache"].forEach((src) => {
  patterns.push(`packages/*/${src}`);
});

const cleans = patterns.map(async (pattern) => {
  try {
    const matchs = await globPromise(pattern);

    const results = matchs.map(async (path) => {
      try {
        await fs.remove(path);
        console.log(path);
      } catch (error) {
        console.log(error);
      }
    });

    await Promise.all(results);
  } catch (error) {
    console.log(error);
  }
});

Promise.all(cleans)
  .then(() => {
    console.log("finish.");
  })
  .catch((err) => console.log(err));


function globPromise(pattern) {
  return new Promise((res, rej) => {
    glob(pattern, (err, matchs) => {
      if (err) return rej(err);
      res(matchs);
    });
  });
}

