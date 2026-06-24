const { UserRole } = require('../models');

exports.getAllUserRoles = async () => {
    return await UserRole.findAll();
};

exports.getUserRoleById = async (id) => {
    return await UserRole.findByPk(id);
};

exports.createUserRole = async (userRole) => {
    return await UserRole.create(userRole);
};