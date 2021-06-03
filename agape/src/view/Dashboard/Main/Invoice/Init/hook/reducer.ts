import { create, State } from "./state";

export const switchInvoice = (): Cb => {
  return (state) => {
    return { ...state, isBuy: !state.isBuy };
  };
};

export const updateDni = (dni: string): Cb => {
  const isValid = /[0-9]/g.test(dni);
  const isEmpty = dni === "";

  return (state) => {
    if (!isValid && !isEmpty) return state;

    return { ...state, dni };
  };
};

export const updateCod = (cod: string): Cb => {
  return (state) => {
    return {
      ...state,
      cod,
    };
  };
};

export const setLoading = (isLoading: boolean): Cb => {
  return (state) => {
    return { ...state, isLoading };
  };
};

export const handlerError = (error: any): Cb => {
  console.log(error);
  return (state) => {
    return {
      ...create(),
      isBuy: state.isBuy,
      error: error.message || "unknow error",
    };
  };
};

/**
 * Typings
 */

type Cb = (state: State) => State;
