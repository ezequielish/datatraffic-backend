const db = require("../db");
const { add } = require("../components/roles/controller");
const chalk = require("chalk");
const debug = require("debug")("db:index");
const roles = [
  {
    name: "Admin",
    level: 99
  },
  {
    name: "Consulta",
    level: 10
  }
];
async function seedRoles() {
  roles.map(async (rol, i) => {
    add(rol)
      .then(data => {
        debug(chalk.green("Result :", data));
      })
      .catch(err => {
        debug(chalk.green("Error :", err));
      });
    
  });

  debug(chalk.red(err));
  process.exit(1);
}

db();
seedRoles();
