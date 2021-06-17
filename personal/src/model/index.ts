import en from "./en";
import es from "./es";
import { href } from "./href";
import { skill } from "../skill";
import type { Language } from "./common";

export const model: Model = {
  route: {
    [href.en]: en,
    [href.es]: es,
  },
  skill,
};

export const lang = {
  en: href.en,
  es: href.es,
};

export default model;

/**
 * Types
 */

export type { Language };

export type Model = {
  route: {
    [K: string]: Language;
  };
  skill: typeof skill;
};
