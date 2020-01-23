const { list, add, update, deleteR } = require("./storage");

function listRoles() {
  return new Promise((resolve, reject) => {
    const result = list();
    resolve(result);
  });
}

function addRole(data) {
  return new Promise((resolve, reject) => {
    if (!data.name || !data.level || typeof data.level != "number" || data.id) {
      console.log("[RolesController] rol inválido");
      reject("Los datos son incorrectos");
    } else {
      const role = add(data);
      resolve(role);
    }
  });
}
function editRole(data) {
  return new Promise(async (resolve, reject) => {
    if (
      !data.name ||
      !data.level ||
      !data.id ||
      typeof data.id != "number" ||
      typeof data.level != "number"
    ) {
      console.log("[RolesController] rol inválido");
      reject("Los datos son incorrectos");
    } else {
      const role = await update(data);
      if (!role) {
        reject("Los datos son incorrectos");
      }
      resolve(role);
    }
  });
}

function deleteRole(data) {
  return new Promise(async (resolve, reject) => {
    if (!data.id || typeof data.id != "number") {
      reject("Los datos son incorrectos");
    }
    const result = await deleteR(data.id);
    if (!result) {
      reject("Los datos son incorrectos");
    }
    resolve("OK");
  });
}
module.exports = {
  list: listRoles,
  add: addRole,
  edit: editRole,
  deleteR: deleteRole
};
