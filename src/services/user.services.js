const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, UserRole } = require('../models');

const notFoundError = () => {
    const error = new Error('User not found');
    error.statusCode = 404;
    return error;
};

exports.getAllUsers = async (filters = {}) => {
    const where = {};

    if (filters.name) {
        where.name = { [Op.like]: `%${filters.name}%` };
    }
    if (filters.email) {
        where.email = { [Op.like]: `%${filters.email}%` };
    }
    if (filters.user_role_name) {
        const roles = await UserRole.findAll({
            where: { role_name: { [Op.like]: `%${filters.user_role_name}%` } },
            attributes: ['id'],
        });

        if (!roles.length) {
            return [];
        }

        where.user_role_id = { [Op.in]: roles.map((role) => role.id) };
    }

    return await User.findAll({ where });
};

exports.getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw notFoundError();
    return user;
};

exports.getCurrentUser = async (id) => {
    return exports.getUserById(id);
};

exports.createUser = async (user) => {
    const existingUser = await User.findOne({
        where: { email: user.email },
    });

    if (existingUser) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }

    const role = await UserRole.findByPk(user.user_role_id);
    if (!role) {
        const error = new Error('User role does not exist');
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        user_role_id: user.user_role_id,
    });
};

exports.updateUser = async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) throw notFoundError();

    if (data.email && data.email !== user.email) {
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            const error = new Error('Email already in use');
            error.statusCode = 400;
            throw error;
        }
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    await user.update({
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.password && { password: data.password }),
    });

    return user;
};

exports.deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw notFoundError();
    await user.destroy();
    return { message: 'User deleted successfully' };
};
