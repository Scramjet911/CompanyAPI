const Role = require('../models/roles')

exports.getAllRoles = (req, res) => {
    Role.findAll()
        .then((roles) => {
            res.status(200).json({
                message: 'Roles retrieved successfully',
                roles: roles,
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json({
                message: 'Employees not found',
            })
        })
}

exports.createRole = (req, res, next) => {
    const roleName = req.body.name;
    Role.create({
        name: roleName,
    })
        .then((role) => {
            res.status(200).json({
                message: 'Role created',
                role: role
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: 'Creating new role failed'
            })
        })
}

exports.updateRole = (req, res, next) => {
    const roleId = req.params.id;
    const roleName = req.body.roleName;
    Role.findByPk(roleId)
        .then((role) => {
            role.name = roleName;
            return role.save();
        })
        .then((role) => {
            resp.status(200).json({
                message: 'Role updated successfully',
                role,
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: 'Role updation failed'
            })
        })
}

exports.deleteRole = (req, res, next) => {
    const roleId = req.params.id;
    Role.findByPk(roleId)
        .then((role) => {
            return role.destroy()
        })
        .then(() => {
            res.status(200).json({
                message: 'Role deleted successfully',
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: 'Role deletion failed',
            })
        })
}
