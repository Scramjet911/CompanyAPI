const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const EmpAddr = sequelize.define('employee_address', {
    empId: {
        type: DataTypes.INTEGER,
        unique: true,
    },
    housename: {
        type: DataTypes.STRING,
    },
    street: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = EmpAddr;