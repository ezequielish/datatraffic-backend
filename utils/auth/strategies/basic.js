const { getUser } = require("../../../components/users/controller");
const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
passport.use(
  new BasicStrategy(async function(username, password, cb) {
    try {
      const user = await getUser(username);
      if (!user) {
        return cb(boom.unauthorized(), false);
      }
      if (password != user.password) {
        return cb(boom.unauthorized(), false);
      }
      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
