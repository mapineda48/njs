const baseURL = "/api/model";

module.exports = {
    baseURL,

    createURL(tableName) {
        return baseURL + "/" + tableName.toLocaleLowerCase();
    }
}