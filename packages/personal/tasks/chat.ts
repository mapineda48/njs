import path from "path";
import fs from "fs-extra";

const file = path.resolve("build/chat/index.html");

const json = path.resolve("dist/build/chat.json");

const regExp = {
  script: /<\s*script[^>]*>(.*?)<\s*\/\s*script>/g,
  style: /<link href=".*?" rel="stylesheet">/g,
};

generateChatJson(true).catch((err) => console.log(err));

/**
 * Generate Json File with static routes to use chat
 */
export async function generateChatJson(remove = false) {
  const exists = await fs.pathExists(file);

  if (!exists) return;

  const html = await fs.readFile(file, "utf-8");

  const script = html.match(regExp.script) || [];

  const style = html.match(regExp.style) || [];

  const data = { header: style, body: script };

  await fs.outputJSON(json, data, { spaces: 2 });

  if (remove) {
    await removeIt(file);
  }
}

async function removeIt(path: string) {
  return new Promise<void>((res, rej) => {
    fs.remove(path, (err) => {
      if (err) return rej(err);
      res();
    });
  });
}
