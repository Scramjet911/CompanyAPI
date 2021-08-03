const { Sequelize } = require('sequelize')

const sequelize = require('../util/database')

const EmpRoles = sequelize.define('employee_roles', {
    empId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = EmpRoles;