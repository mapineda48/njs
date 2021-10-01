import fs from "fs-extra";
import path from "path";
import model from "./src/web/model";

/**
 * Generate Model Production
 */
const file = path.join(__dirname, "build/model.json");

fs.outputJSONSync(file, minify(model as any));

function minify(data: Data): any {
  return Object.fromEntries(
    Object.entries(data).map(([key, val]) => {
      if (typeof val === "string") {
        return [
          key,
          val.replace(/\n/g, "").replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
        ];
      }
      return [key, minify(val)];
    })
  );
}

/**
 * Types
 */
interface Data {
  [K: string]: string | Data;
}
