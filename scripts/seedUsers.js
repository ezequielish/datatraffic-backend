
const db = require("../db");
const { add } = require("../components/users/controller");
const chalk = require("chalk");
const debug = require("debug")("db:index");

const users = [
    {

        username: 'ezequiel',
        password: 'secret',
        rol_id: 1
    },
    {
        username: 'misael',
        password: 'secret',
        rol_id: 2
    }
]
async function seedUsers() {
    users.map(async (user, i) => {
    add(user)
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
seedUsers();
