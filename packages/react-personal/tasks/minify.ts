function isString(val: any): val is string {
  return typeof val === "string";
}

function isObj(val: any): val is {} {
  return typeof val === "object";
}

export function minify(val: string) {
  return val.replace(/\n/g, "").replace(/[ \t]{2,}/g, "");
}

export function minifyString(model: any): any {
  if (Array.isArray(model)) {
    return model.map((val) => minifyString(val));
  }

  if (isString(model)) {
    return minify(model);
  }

  const res: any = {};

  Object.keys(model).forEach((key) => {
    const val = model[key];

    if (isString(val)) {
      res[key] = minify(val);
    }

    if (isObj(val)) {
      res[key] = minifyString(val);
    }
  });

  return res;
}
