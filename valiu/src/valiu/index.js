import axios from "axios";
import { api } from "@/shared";
function parseError(error) {
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
            return res.data;
        }
        catch (error) {
            throw parseError(error);
        }
    },
    async insert(tag) {
        try {
            await axios.post(api, tag);
        }
        catch (error) {
            throw parseError(error);
        }
    },
    async update(tag) {
        try {
            await axios.put(api, tag);
        }
        catch (error) {
            throw parseError(error);
        }
    },
    async delete(id) {
        try {
            await axios.delete(api + "/" + id);
        }
        catch (error) {
            throw parseError(error);
        }
    }
};
export default valiu;
//# sourceMappingURL=index.js.map