const { list,add } = require("./storage");

function listLogs(q) {
  return new Promise((resolve, reject) => {
    const result = list(q);
    resolve(result);
  });
}

function addLog(data) {
  return new Promise(async (resolve, reject) => {
    if (!data.body.action || !data.user.id) {
      console.log("[LogsController] datos inválido");
      reject("Los datos son incorrectos");
    } else {
      const log = {
        action: data.body.action,
        datetime: new Date(),
        UserId: data.user.id
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
