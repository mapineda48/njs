export const guestID = "foo";

const instance = {
  get() {
    return Promise.resolve({ data: true });
  },

  post() {
    return Promise.resolve({ data: guestID });
  },
};

const axios: any = {
  create() {
    return instance;
  },
};

export default axios;
