"use strict";
const connect = require("../../db");

async function getAll(q) {
  const { UsersModel, LogsModel } = await connect();
  const cond = {
    where: {
      action: q
    },
    limit: 10, // limite de filas
    order: [['datetime', 'ASC']], // ordenador por fecha de creación y descendiente
    include: [
      {
        // join
        model: UsersModel
      }
    ],
    raw: true
  };
  if(!q){
    delete cond.where; 
  }
  const result = await LogsModel.findAll(cond);
  return result;
}


async function createLog(log) {
  const { UsersModel, LogsModel } = await connect();
  const cond = {
    where: {
      id: log.UserId
    }
  };
  let existsUser = await UsersModel.findOne(cond);
  if (!existsUser) {
    return false;
  }
  let result = await LogsModel.create(log);
  return result.id;
}




module.exports = {
  list: getAll,
  add: createLog
};
