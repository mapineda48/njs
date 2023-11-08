import lodash from "lodash";
import path from "path";
import { Model, ModelCtor } from "sequelize";

export const delimiter = "_";

export function toMap(models: Models) {
  const entries = Object.entries(models).map(([ModelName, model]) => {
    const coll = ModelName.split(delimiter);

    return [coll, model] as const;
  });

  return lodash.reduce(
    entries,
    (acc, [path, value]) => {
      lodash.set(acc, path, value);
      return acc;
    },
    {}
  );
}

const ext = path.extname(__filename);
const root = path.join(__dirname, "../../models");

export function toModelName(str: string) {
  return str
    .replace(root + "/", "")
    .replace("/", delimiter)
    .replace(ext, "");
}

/**
 * Types
 */
type Models = {
  [key: string]: ModelCtor<Model<any, any>>;
};
