const knex = require("knex");
const configFile = require("../knexfile");

// eslint-disable-next-line no-undef
const environment = process.env.NODE_ENV || "development";

module.exports = knex(configFile[environment]);
