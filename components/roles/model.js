"use strict";

const Sequelize = require("sequelize");
const setupDatabase = require("../../db/db");

function setupRolesModel(config) {
  const instSequelize = setupDatabase(config);

  return instSequelize.define("Roles", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  });
}

module.exports = setupRolesModel;
