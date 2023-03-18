/**
 * No backend dependencies should be imported in this file, only shared logic between
 * frontend and backend
 */

const Op = require("./Op.json");
const findOptions = "search";

createApiPath = function createApiPath(baseURL) {
  return {
    create: baseURL + "/create",
    update: baseURL + "/update",
    destroy: baseURL + "/destroy",
    count: baseURL + "/count",
    findAll: baseURL + "/findAll",
    findAndCountAll: baseURL + "/findAndCountAll",
  };
};


module.exports = {
  ...require("./sequelize"),
  Op,
  findOptions,
  createApiPath,
  User: require("./user"),
}