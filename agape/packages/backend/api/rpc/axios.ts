import axios, { CreateAxiosDefaults } from "axios";

const instance = create();

export default instance;

/**
 * Init Axios Instance
 */
export function create(config?: CreateAxiosDefaults) {
  return axios.create({
    ...config,
    baseURL:
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000",
  });
}
