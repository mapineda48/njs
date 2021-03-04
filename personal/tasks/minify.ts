export function isString(val: any): val is string {
  return typeof val === "string";
}

export function minifyString(val: string) {
  return val.replace(/\n/g, "").replace(/^\s+|\s+$|\s+(?=\s)/g, "");
}

export function minifyModel(model: any) {
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
