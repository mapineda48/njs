import { State } from "./state";

export const updateUsername = (username: string): Cb => {
  return (state) => {
    return {
      ...state,
      username,
    };
  };
};

export const updatePassword = (password: string): Cb => {
  return (state) => {
    return {
      ...state,
      password,
    };
  };
};

export const addError = (error: any): Cb => {
  console.log(error);
  return (state) => {
    return {
      ...state,
      isLoading: false,
      username: "",
      password: "",
      error,
    };
  };
};

export const setLoading = (isLoading: boolean): Cb => {
  return (state) => {
    return { ...state, isLoading };
  };
};

/**
 * Typings
 */

type Cb = (state: State) => State;
