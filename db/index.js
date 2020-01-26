"use strict";
const chalk = require("chalk");
const debug = require("debug")("db:index");
const setupDatabase = require("./db"); //instancia de la conexión
const setupRolescModel = require("../components/roles/model");
const setupUserscModel = require("../components/users/model");
const setupLogsModel = require("../components/logs/model");
const relationRolesUsers = require("./relations/RolesUsers");
const relationUsersLogs = require("./relations/UsersLogs");


const { host_db, password, database, user_db, setupDB } = require("../config");


const setupConfig = (setupDB == 'true')
// const relationUsersLogs = require("./relations/UsersLogs");
const defaults = require("defaults");
module.exports = async function() {
  try {
    const configConnect = {
      database: database,
      username: user_db,
      password: password,
      host: host_db,
    };
   const config = defaults(configConnect, {
     dialect: "postgres",
        dialectOptions: {
            ssl: true
        },
      setup: setupConfig,
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      },
      query: {
        raw: true
      }
    });

    const instSequelize = setupDatabase(config); //Inicializar Instancia
    const RolesModel = setupRolescModel(config); //Modelo de Users
    const UsersModel = setupUserscModel(config); //Modelo de Users
    const LogsModel = setupLogsModel(config); //Modelo de Logs
    relationRolesUsers(RolesModel, UsersModel)
    relationUsersLogs(UsersModel, LogsModel);

    instSequelize.authenticate().then(() => {
      if (config.setup) {
        instSequelize.sync({ force: true });
      }     
    });
    return{
      RolesModel,
      UsersModel,
      LogsModel
    }
  } catch (error) {
    console.error(`${chalk.red("[fatal error]")} ${error}`); // Mostramos el mensaje del error
  }
};
// "use strict";
// const chalk = require("chalk");
// const defaults = require("defaults");
// const { host, password, database, user_db, port_serve } = require("../config");
// const RolesModel = require("../components/roles/model");
// const UsersModel = require("../components/users/model");
// // const Sequelize = require("sequelize");
// const Sequelize = require("sequelize");
// const configConnect = {
//   database: database,
//   username: user_db,
//   password: password,
//   host: host,
//   dialect: "postgres"
// };
// const config = defaults(configConnect, {
//   dialect: "postgres",
//   setup: false,
//   pool: {
//     max: 10,
//     min: 0,
//     idle: 10000
//   },
//   query: {
//     raw: true
//   }
// });
// // let instSequelice = null;
// // if (!instSequelice) {
// //   instSequelice = new Sequelize(config);
// //   console.log(`${chalk.green("[Connecting to DB]")} `);
// // }
// const instSequelice = new Sequelize(config);
// // RolesModel.hasMany(UsersModel);
// // UsersModel.belongsTo(RolesModel);
// // function sequelize(config = null) {

// //   if (!instSequelice) {
// //     instSequelice = new Sequelize(config);
// //     console.log(`${chalk.green("[Connecting to DB]")} `);
// //   }
// //   return instSequelice;
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// module.exports = instSequelice;

// "use strict";
// const chalk = require("chalk");
// const defaults = require("defaults");
// const { host, password, database, user_db, port_serve } = require("../config");
// const Sequelize = require("sequelize");
// let instSequelice = null;

// async function sequelize() {
//   const configConnect = {
//     database: database,
//     username: user_db,
//     password: password,
//     host: host,
//     dialect: "postgres"
//   };
//   const config = defaults(configConnect, {
//     dialect: "postgres",
//     setup: false,
//     pool: {
//       max: 10,
//       min: 0,
//       idle: 10000
//     },
//     query: {
//       raw: true
//     }
//   });
//   if (!instSequelice) {
//     instSequelice = new Sequelize(config);

//     try {
//         await instSequelice.authenticate();
//         console.log(`${chalk.green("[Connecting to DB]")} `);
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }

//   }
//   return instSequelice;
// }

// module.exports = sequelize;
