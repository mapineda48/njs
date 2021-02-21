export const create = (): State => {
  return {
    isLoading: false,
    isBuy: false,
    dni: "",
    cod: "",
  };
};

/**
 * Typings
 */

export type State = {
  isLoading: boolean;
  isBuy: boolean;
  dni: string;
  cod: string;
  error?: any;
};
