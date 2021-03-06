"use strict";
const Sequelize = require("sequelize");
const db = require("./database");

const Movies = db.define("movies", {
  title: {
    type: Sequelize.STRING,
  },
  thumbsup: {
    type: Sequelize.INTEGER,
  },
  thumbsdown: {
    type: Sequelize.INTEGER,
  },
  moviesId: {
    type: Sequelize.INTEGER,
  },
  cookies: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },
});

module.exports = Movies;
