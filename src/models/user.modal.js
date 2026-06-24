const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user_roles',
            key: 'id',
        },
    },
}, {
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
    },
})

module.exports = { User }
