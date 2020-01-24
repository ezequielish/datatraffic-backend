"use strict";
const connect = require("../../db");
const { Op } = require('sequelize')

async function getAll(level) {
  const { RolesModel } = await connect();
  const cond = {
    limit: 10,
    where: {
      level: {
        [Op.lte]: level
      }
    }
  };
  const result = await RolesModel.findAll(cond);
  return result;
}

async function createRole(role) {
  const { RolesModel } = await connect();
  let result = await RolesModel.create(role);
  return result.id;
}
async function updateRole(role) {
  const { RolesModel } = await connect();
  const cond = {
    where: {
      id: role.id
    }
  };
  let existsRole = await RolesModel.findOne(cond);
  if (existsRole) {
    const update = await RolesModel.update(role, cond);
    return existsRole.id;
  }
  return false;
}

async function deleteRole(id) {
  const cond = {
    where: {
      id
    }
  };
  const { RolesModel } = await connect();
  let existsRole = await RolesModel.findOne(cond);
  if (!existsRole) {
    return false;
  }
  let result = await RolesModel.destroy(cond);

  return true;
}

module.exports = {
  list: getAll,
  add: createRole,
  update: updateRole,
  deleteR: deleteRole
};
