const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Party = sequelize.define('party', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'parties',
});

module.exports = { Party }