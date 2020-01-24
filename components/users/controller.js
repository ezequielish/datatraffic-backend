const { list, get, add, update, deleteU, updateToken } = require("./storage");

function listUsers(user) {
  return new Promise((resolve, reject) => {
    const level = user["Role.level"];

    const result = list(level);
    resolve(result);
  });
}
function getUser(user) {
  return new Promise((resolve, reject) => {
    const result = get(user);
    resolve(result);
  });
}
function addUser(data) {
  return new Promise(async (resolve, reject) => {
    
    if (!data.username || !data.password || typeof data.rol_id != "number") {
      console.log("[UsersController] User inválido");
      reject("Los datos son incorrectos");
    } else {
      const user = {
        ...data,
        RoleId: data.rol_id
      };

      const result = await add(user);
      if (!result) {
        reject("Los datos son incorrectos");
      }
      resolve(result);
    }
  });
}
function editUser(data) {
  return new Promise(async (resolve, reject) => {
    if (!data.username || !data.password || typeof data.id != "number") {
      console.log("[UsersController] User inválido");
      reject("Los datos son incorrectos");
    } else {
      const user = {
        ...data,
        RoleId: data.rol_id
      };
      const result = await update(user);
      if (!result) {
        reject("Los datos son incorrectos");
      }
      resolve(result);
    }
  });
}

async function updateAccessToken(token, id) {
  await updateToken(token, id);
}

function deleteUser(data) {
  return new Promise(async (resolve, reject) => {
    if (!data.id || typeof data.id != "number") {
      reject("Los datos son incorrectos");
    }
    const result = await deleteU(data.id);
    if (!result) {
      reject("Los datos son incorrectos");
    }
    resolve("OK");
  });
}
module.exports = {
  list: listUsers,
  add: addUser,
  edit: editUser,
  deleteU: deleteUser,
  getUser: getUser,
  updateAccessToken
};
