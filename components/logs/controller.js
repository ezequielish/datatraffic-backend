const { list,add } = require("./storage");

function listLogs(q) {
  return new Promise((resolve, reject) => {
    const result = list(q);
    resolve(result);
  });
}

function addLog(action, id) {
  return new Promise(async (resolve, reject) => {
    if (!action || !id) {
      console.log("[LogsController] datos inválido");
      reject("Los datos son incorrectos");
    } else {
      const log = {
        action: action,
        datetime: new Date(),
        UserId: id
      };

      const result = await add(log);
      if (!result) {
        reject("Los datos son incorrectos");
      }
      resolve(result);
    }
  });
}

module.exports = {
    list: listLogs,
  add: addLog
};



module.exports = {
    list: listLogs,
  add: addLog
};
