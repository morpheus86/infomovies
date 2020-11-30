"use strict";
const Sequelize = require("sequelize");
const { database, user, password, host } = require("./dbinfo");
let db;
process.env.DATABASE_URL
  ? (db = new Sequelize(process.env.DATABASE_URL))
  : (db = new Sequelize(database, user, password, {
      host,
      dialect: "postgres",
      logging: false,
    }));

module.exports = db;
