const delimiter = ":";

/**
 * Primitive Values
 */
const parseTypes = Object.entries({
  // integer
  i(value: string) {
    return parseInt(value);
  },

  // float
  f(value: string) {
    return parseFloat(value);
  },

  // boolean
  b(value: string) {
    return value === "on" || value === "true";
  },

  // date
  d(value: string) {
    return new Date(value);
  },
});

const [integer, float, boolean, date] = parseTypes.map(([type]) => {
  return (name: string) => name + delimiter + type;
});

/**
 * Files
 */
const files = (name: string) => name + delimiter + "mf";

function parseFile(field: string, value: File, formData: FormData): Entrie {
  if (field.endsWith(":mf")) {
    return [field.replace(":mf", ""), formData.getAll(field) as any];
  }

  return [field, value];
}

/**
 * Types allow
 */
export const type = { integer, float, boolean, date, files };

/**
 * Parse field form server action
 */
export function parseData(field: string, value: Value, form: FormData): Entrie {
  // Unknown
  if (!field.includes(delimiter)) {
    return [field, value];
  }

  if (typeof value !== "string") {
    return parseFile(field, value, form);
  }

  const [key, type] = field.split(delimiter);

  const [, parse] = parseTypes.find(([t]) => t === type) ?? [];

  if (!parse) {
    return [key, value];
  }

  return [key, parse(value)];
}

/**
 * Types
 */
type Value = string | File;

type Entrie = [Key: string, Value: string | number | boolean | File | Date];
