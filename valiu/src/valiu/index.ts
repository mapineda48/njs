import axios from "axios";
import { api } from "@/shared";
import { Tag } from "../store/state";

function parseError(error: any): Error {
  console.log(error);

  if (error?.response?.data?.message) {
    return new Error(error.response.data.message);
  }

  if (error.message) {
    return error;
  }

  return new Error("unknown http error");
}

const valiu = {
  async get() {
    try {
      const res = await axios.get(api);

      return res.data as Tag[];
    } catch (error) {
      throw parseError(error);
    }
  },

  async insert(tag: Omit<Tag, "id">) {
    try {
      await axios.post(api, tag);
    } catch (error) {
      throw parseError(error);
    }
  },

  async update(tag: Omit<Tag, "color">) {
    try {
      await axios.put(api, tag);
    } catch (error) {
      throw parseError(error);
    }
  },

  async delete(id: number) {
    try {
      await axios.delete(api + "/" + id);
    } catch (error) {
      throw parseError(error);
    }
  }
};

export default valiu;
