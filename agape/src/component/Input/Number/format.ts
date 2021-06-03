export const add: Add = (value, opt = {}) => {
  const { allowFloat, disabledDot } = opt;

  value = allowFloat ? value : Math.round(value);

  if (isNaN(value)) {
    return "";
  }

  const result = value.toLocaleString("de-DE", {
    maximumFractionDigits: 4,
  });

  if (disabledDot) {
    return result.replace(/\./g, "");
  }

  return result;
};

export const remove: Remove = (value, onNaN) => {
  if (!value) {
    return 0;
  }

  value = value.replace(/\./g, "").replace(",", ".");

  const result = parseFloat(value);

  if (isNaN(result)) {
    if (onNaN) onNaN();
    return 0;
  }

  return result;
};

/**
 * Typings
 */

export type Option = { allowFloat?: boolean; disabledDot?: boolean };

type Add = (value: number, opt?: Option) => string;

type Remove = (value: string, onNaN?: () => void) => number;
