"use strict";
const chalk = require("chalk");
const Sequelize = require("sequelize");
let instSequelice = null;

function sequelize(config = null) {
  
  if (!instSequelice) {
    instSequelice = new Sequelize(config);
    console.log(`${chalk.green("[Connecting to DB]")} `);
  }
  return instSequelice;
}

module.exports = sequelize;
