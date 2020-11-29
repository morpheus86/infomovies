"use strict";
const Sequelize = require("sequelize");
const { database, user, password, host } = require("./dbinfo");
const db = new Sequelize(database, user, password, {
  host,
  dialect: "postgres",
  logging: false,
});

module.exports = db;
