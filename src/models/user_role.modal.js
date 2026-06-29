const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const UserRole = sequelize.define('user_role', {
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
})

module.exports = { UserRole }
