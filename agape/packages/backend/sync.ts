import os from "os";
import path from "path";
import fs from "fs-extra";
import ts from "typescript";
import { importApis } from "./router/api";

const outDir = os.tmpdir();
const baseSrc = "router/api/";
const baseDest = "integration/api/type/";

const pathJson = "integration/api/path.json";


importApis()
  .then((apis) => {
    const route: any = {};

    apis.forEach(({ keys, path }) => {
      toJson(keys, path, route);
    });

    fs.outputJsonSync(pathJson, route);

    const filenames = new Set(
      apis.map(({ filename }) => filename.replace(__dirname + "/", ""))
    );

    console.log(filenames);

    return isolatedDeclarations([...filenames]);
  })
  .catch((err) => console.error(err));

/**
 *
 */
function toJson(keys: string[], path: string, res: Json) {
  const [key, ...rest] = keys;

  if (!rest.length) {
    res[key] = path;
    return;
  }

  if (!res[key]) {
    res[key] = {};
  }

  toJson(rest, path, res[key] as Json);
}

/**
 * Typescript
 */
function isolatedDeclarations(filenames: string[]) {
  const program = ts.createProgram(filenames, {
    declaration: true,
    emitDeclarationOnly: true,
    outDir,
    module: ts.ModuleKind.System,
    target: ts.ScriptTarget.ESNext,
  });

  program.emit();

  const tasks = filenames.map(async (filename) => {
    const declaration = filename.replace(".ts", ".d.ts");
    const dest = declaration.replace(baseSrc, baseDest);

    const result = path.join(outDir, declaration);

    await fs.move(result, dest);

    await fixImportIntegration(dest);
  });

  return Promise.all(tasks);
}

/**
 * 
 */
async function fixImportIntegration(filename: string) {
  const data = await fs.readFile(filename, "utf-8");

  if (!/(\.\.\/)+integration/.test(data)) {
    return;
  }

  const relative = path.relative(path.dirname(filename), "integration");

  const resultado = data.replace(/(\.\.\/)+integration/g, relative);

  await fs.outputFile(filename, resultado);
}

/**
 * Types
 */
interface Json {
  [K: string]: string | Json;
}
