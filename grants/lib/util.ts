export function prepareRoute<T>(route: T): T {
  const entries = Object.entries(route).map(([key, val]) => [key, "/" + val]);

  return Object.fromEntries(entries);
}

export const errCheckNumber = {
  MISSING: "missing number",
  INVALID: "invalid number",
};

export function checkNumber(value?: any) {
  if (value === undefined) {
    throw new Error(errCheckNumber.MISSING);
  }

  const number = parseInt(value);

  if (isNaN(number)) {
    throw new Error(errCheckNumber.INVALID);
  }

  return number;
}
