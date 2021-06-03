export const create = (): State => {
  return {
    isLoading: false,
    username: "",
    password: "",
  };
};

/**
 * Typings
 */

export interface State {
  isLoading: boolean;
  username: string;
  password: string;
  error?: any;
}
