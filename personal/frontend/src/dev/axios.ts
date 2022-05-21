import model from "../web/model";

const axios = {
  async get() {
    return Promise.resolve({data:model});
  },
};

export default axios;
