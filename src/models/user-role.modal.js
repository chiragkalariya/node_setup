const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const userRole = sequelize.define('user-role',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})