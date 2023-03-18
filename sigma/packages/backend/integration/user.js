const integration = require("./sequelize");

const tableName = "User";

module.exports = {
    tableName,
    baseURL: integration.createURL(tableName)
}