/**
 * 
 * @param {*} RolesModel modelo de la tabla Roles
 * @param {*} UsersModel modelo de la tabla Users
 */
function applyRelation(RolesModel, UsersModel){
    RolesModel.hasMany(UsersModel); //Llave foránea
    UsersModel.belongsTo(RolesModel); //Unión de llave foránea
}

module.exports = applyRelation