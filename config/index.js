require("dotenv").config();
const config = {

  port_db: process.env.PORT_DB,
  host_app: process.env.HOST,
  host_db: process.env.HOST_DB,
  user_db: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DB,
  token: process.env.TOKEN,
  setupDB: process.env.SETUP_DB
};

module.exports = {
  host_app: config.host_app,
  host_db: config.host_db,
  password: config.password,
  database: config.database,
  user_db: config.user_db,
  token: config.token,
  setupDB: config.setupDB
};
