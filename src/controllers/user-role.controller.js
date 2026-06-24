const userRoleService = require('../services/user-role.service');

exports.getAllUserRoles = async (req, res, next) => {
    try {
        const userRoles = await userRoleService.getAllUserRoles();
        res.json(userRoles);
    } catch (error) {
        next(error);
    }
};

exports.getUserRoleById = async (req, res, next) => {
    try {
        const userRole = await userRoleService.getUserRoleById(req.params.id);
        res.json(userRole);
    } catch (error) {
        next(error);
    }
};

exports.createUserRole = async (req, res, next) => {
    try {
        const userRole = await userRoleService.createUserRole(req.body);
        res.status(201).json(userRole);
    } catch (error) {
        next(error);
    }
};