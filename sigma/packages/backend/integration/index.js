/**
 * No backend dependencies should be imported in this file, only shared logic between
 * frontend and backend
 */

module.exports.Op = require("./Op.json");
module.exports.findOptions = "search";

module.exports.apiPath = require("./apiPath.json");

module.exports.createModelApiPath = function createModelApiPath(baseURL) {
  return {
    create: baseURL,
    update: baseURL,
    destroy: baseURL,
    search: baseURL,
    count: baseURL + "/count",
    findAll: baseURL + "/findAll",
    findAndCountAll: baseURL + "/findAndCountAll",
  };
};
