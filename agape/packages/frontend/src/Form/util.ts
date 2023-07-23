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

  Object.entries(descriptors).forEach(([key, descriptor]) => {
    const current = descriptor.get ? descriptor.get() : descriptor.value;

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

export function bindForm(target: any, source: any): any {
  if (!isForm(target)) {
    return;
  }

  if (Array.isArray(target)) {
    target.forEach((target, index) => bindForm(target, source[index]));
  }

  const descriptors = Object.getOwnPropertyDescriptors(target);

  Object.entries(descriptors).forEach(([key, descriptor]) => {
    const current = descriptor.get ? descriptor.get() : descriptor.value;

    if (Array.isArray(current) || isForm(current)) {
      bindForm(current, source[key]);
      return;
    }

    target[key] = source[key];
  });
}
