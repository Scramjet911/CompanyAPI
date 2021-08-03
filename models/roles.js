const { DataTypes } = require('sequelize')

const sequelize = require('../util/database')

const Role = sequelize.define('role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Role;