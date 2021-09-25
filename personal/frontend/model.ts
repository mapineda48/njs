import fs from "fs-extra";
import path from "path";
import model from "./src/web/model";

/**
 * Generate Model Production
 */
const file = path.join(__dirname, "build/model.json");

fs.outputJSONSync(file, minifyModel(model));

export function isString(val: any): val is string {
  return typeof val === "string";
}

export function minifyString(val: string): string {
  return val.replace(/\n/g, "").replace(/^\s+|\s+$|\s+(?=\s)/g, "");
}

export function minifyModel(model: any): any {
  if (Array.isArray(model)) {
    return model.map((val) => minifyModel(val));
  }
  if (isString(model)) {
    return minifyString(model);
  }

  const res: any = {};

  Object.keys(model).forEach((key) => {
    const val = model[key];
    res[key] = minifyModel(val);
  });

  return res;
}
