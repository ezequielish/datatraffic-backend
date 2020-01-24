const boom = require("@hapi/boom");

function validationHandler() {
  return function(req, res, next) {
    const jwt = req.headers.authorization.split("Bearer ")[1];

    if (jwt != req.user.acces_token) {
      next(boom.unauthorized("invalid jwt"));
    }

    if (!req.user || (req.user && !req.user["Role.level"])) {
      next(boom.unauthorized("Missing scopes"));
    }
    
    if (req.baseUrl == "/api/user" || req.baseUrl == "/api/roles" && req.method != "GET") {
      if (req.user["Role.level"] != 99) {
        next(boom.unauthorized());
      }
    }

    next();
  };
}

module.exports = validationHandler;
