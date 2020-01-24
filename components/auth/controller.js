const passport = require("passport");
const jwt = require("jsonwebtoken");
const { add } = require("../logs/controller");
const { token } = require("../../config");
const { updateAccessToken } = require("../users/controller");
const boom = require("@hapi/boom");
require("../../utils/auth/strategies/basic");

function login(req, res) {
  return new Promise(async (resolve, reject) => {
    
    passport.authenticate("basic", function(error, user) {
      //aplicamos estrategia basic

      try {
        if (error || !user) {
          return reject("Datos Inválidos");
          
        }
        req.login(user, { session: false }, async function(error) {
          if (error) {
           return reject(boom.unauthorized());
          }

          const { RoleId, username, id } = user;

          const payload = {
            sub: id,
            username,
            rol: RoleId
          };

          const jwtoken = jwt.sign(payload, token, {
            expiresIn: "15m"
          });

          updateAccessToken(jwtoken, id);
          add("inicio sesion", id)
          resolve({ jwtoken, user: { id }, rol: user['Role.level']  });
        });
      } catch (err) {
        reject(err);
      }
    })(req, res);
  });
}

async function logout(body) {
  return new Promise(async (resolve, reject) => {
    const result = await updateAccessToken("", body.user.id);

    resolve("OK");
  });
}
module.exports = {
  login,
  logout
};
