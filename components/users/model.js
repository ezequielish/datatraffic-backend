'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require("../../db/db")

function setupUserModel (config) {
  const instSequelize = setupDatabase(config)

  return instSequelize.define('Users', {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    acces_token: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  })
}

module.exports = setupUserModel
