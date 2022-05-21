export const token = "my secret token";
export const miguelID = "miguel";

const instance = {
  get() {
    return Promise.resolve({ data: true });
  },

  post() {
    return Promise.resolve({ data: token });
  },
};

const axios: any = {
  create() {
    return instance;
  },
};

export default axios;
