const { UserRole } = require('../models');

exports.getAllUserRoles = async () => {
    return await UserRole.findAll();
};

exports.getUserRoleById = async (id) => {
    return await UserRole.findByPk(id);
};

exports.createUserRole = async (userRole) => {
    const existingUserRole = await UserRole.findOne({
        where: { role_name: userRole.role_name },
    });
    if (existingUserRole) {
        const error = new Error('User role already exists');
        error.statusCode = 400;
        throw error;
    }
    return await UserRole.create(userRole);
};