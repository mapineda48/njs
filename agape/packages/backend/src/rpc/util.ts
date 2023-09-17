import lodash from "lodash";

export function toJsonApi(collection: (string | string[])[][]) {
  return lodash.reduce(
    collection,
    (acc, [path, value]) => {
      lodash.set(acc, path, value);
      return acc;
    },
    {}
  );
}
