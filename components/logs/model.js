'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../../db/db')

function setupLogsModel (config) {
  const instSequelize = setupDatabase(config)

  return instSequelize.define('Logs', {
    datetime: {
      type: Sequelize.DATE,
      allowNull: false
    },
    action: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}

module.exports = setupLogsModel