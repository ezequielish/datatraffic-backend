/**
 * 
 * @param {*} UsersModel modelo de la tabla Users
 * @param {*} LogsModel modelo de la tabla Logs
 */
function applyRelation(UsersModel, LogsModel){
    UsersModel.hasMany(LogsModel); //Llave foránea
    LogsModel.belongsTo(UsersModel); //Unión de llave foránea
}

module.exports = applyRelation