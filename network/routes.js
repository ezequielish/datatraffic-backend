const roles = require("../components/roles/network");
const users = require("../components/users/network");
const login = require("../components/auth/network");
const logs = require("../components/logs/network");
function routes(server) {
  server.use("/api/roles", roles);
  server.use("/api/users", users);
  server.use("/api/login", login);
  server.use("/api/logs", logs);
}

module.exports = {
  routes
};
