"use strict";
const connect = require("../../db");
const { Op } = require("sequelize");
async function getAll(level) {
  const { UsersModel, RolesModel } = await connect();
  const cond = {
    limit: 10,
    attributes: ["id", "username", "status", "RoleId", "password"],
    include: [
      {
        // join
        model: RolesModel,
        where: {
          level: {
            [Op.lte]: level
          }
        },
        attributes: ["level", "name"]
      }
    ],
    raw: true
  };
  const result = await UsersModel.findAll(cond);
  return result;
}
async function getUser(filterUser) {
  const { UsersModel, RolesModel } = await connect();
  const cond = {
    where: {
      // La condición
      username: filterUser
    },
    include: [
      {
        // join
        model: RolesModel
      }
    ],
    raw: true
  };

  const result = await UsersModel.findOne(cond);
  if (!result) {
    return false;
  }
  return result;
}

async function createUser(user) {
  const { UsersModel, RolesModel } = await connect();
  const cond = {
    where: {
      id: user.rol_id
    }
  };
  let existsRole = await RolesModel.findOne(cond);
  if (!existsRole) {
    return false;
  }
  let result = await UsersModel.create(user);
  return result.id;
}
async function updateUser(user) {
  const { UsersModel, RolesModel } = await connect();
  const condRole = {
    where: {
      id: user.rol_id
    }
  };
  const cond = {
    where: {
      id: user.id
    }
  };
  let existsRole = await RolesModel.findOne(condRole);
  let existsUser = await UsersModel.findOne(cond);

  if (existsRole && existsUser) {
    const update = await UsersModel.update(user, cond);
    return existsUser.id;
  }
  return false;
}

async function updateAccessToken(token, id) {
  const { UsersModel } = await connect();
  const cond = {
    where: {
      id: id
    }
  };
  const access_token = {
    acces_token: token
  };

  const update = await UsersModel.update(access_token, cond);
}
async function deleteUser(id) {
  const cond = {
    where: {
      id
    }
  };
  const condLogs = {
    where: {
      UserId: id
    }
  };

  const { UsersModel, LogsModel } = await connect();

  let existsUser = await UsersModel.findOne(cond);
  let existsUserLogs = await LogsModel.findOne(condLogs);
  if (!existsUser) {
    return false;
  }
  if (existsUserLogs) {
    return false;
  }
  let result = await UsersModel.destroy(cond);

  return true;
}

module.exports = {
  list: getAll,
  get: getUser,
  add: createUser,
  update: updateUser,
  deleteU: deleteUser,
  updateToken: updateAccessToken
};
