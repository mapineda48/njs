const form = Symbol();

export function setForm(val: any): any {
  return { ...val, [form]: true };
}

export function isForm(val: any) {
  return Boolean(val[form]);
}

export function parseForm(form: any): any {
  if (!isForm(form)) {
    return form;
  }

  if (Array.isArray(form)) {
    return form.map(parseForm);
  }

  const res: any = {};

  const descriptors = Object.getOwnPropertyDescriptors(form);

  Object.entries(descriptors).forEach(([key, value]) => {
    if (!value.get) {
      return;
    }

    const current = value.get();

    if (Array.isArray(current)) {
      res[key] = current.map(parseForm);
      return;
    }

    if (typeof current === "object") {
      res[key] = parseForm(current);
      return;
    }

    res[key] = current;
  });

  return res;
}
