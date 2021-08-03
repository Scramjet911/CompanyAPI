const Employee = require('../models/employees');
const EmpDept = require('../models/employeeDepartment');
const EmpRole = require('../models/employeeRoles')
const bcrypt = require('bcrypt');
const loginConstants =  require('../constants/login.constants');
const EmpAddr = require('../models/employeeAddress');

exports.getAllEmployees = (req, resp, next) => {
    Employee.findAll()
        .then(employees => {
            resp.status(200).json({
                message: 'Employees retrieved successfully',
                employees: employees
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employees not found'
            });
        });
};

exports.getEmployee = (req, resp, next) => {
    const empId = req.params.id;
    Employee.findByPk(empId)
        .then(employee => {
            resp.status(200).json({
                employee
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee not found'
            });
        })
};

exports.getEmployeeDepartments = (req, resp, next) => {
    const empId = req.params.id;
    EmpDept.findAll({
        attributes: ['deptId'],
        where: { empId: empId }
    })
        .then(employeeDepartments => {
            resp.status(200).json({
                employeeDepartments
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Departments not found'
            })
        });
};

exports.postEmployee = (req, resp, next) => {
    const name = req.body.name;
    const age = req.body.age;
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, loginConstants.salt);
    Employee.create({
        name: name,
        age: age,
        username,
        password,
    }).then(employee => {
        resp.status(200).json({
            message: 'Employee created successfully',
            employee
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Employee creation failed'
        });
    });
};

exports.postEmployeeDepartment = (req, resp, next) => {
    const empId = req.params.id;
    const deptId = req.body.deptId;
 
    EmpDept.create({
        empId: empId,
        deptId: deptId
    }).then(employeeDepartment => {
        resp.status(200).json({
            message: `Department ${employeeDepartment.deptId} added for employee ${employeeDepartment.empId}`
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding department for employee failed'
        });
    });
};

exports.editEmployee = (req, resp, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const isActive = req.body.isActive;
    Employee.findByPk(id)
        .then(employee => {
            employee.name = name,
            employee.age = age,
            employee.isActive = isActive
            return employee.save();
        })
        .then(employee => {
            resp.status(200).json({
                message: 'Employee updated successfully',
                employee
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee updation failed'
            });
        });
};

exports.addAddress = (req, res, next) => {
    const empId = req.params.id;
    const housename = req.body.housename;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const pincode = req.body.pincode;
    EmpAddr.create({
        empId: empId,
        housename: housename,
        street: street,
        city: city,
        state: state,
        pincode: pincode,
    }).then(address => {
        res.status(200).json({
            message: 'Address added successfully',
            address
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            message: 'Address addition failed'
        });
    });
}

exports.editAddress = (req, res, next) => {
    const empId = req.params.id;
    const housename = req.body.housename;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const pincode = req.body.pincode;
    EmpAddr.findByPk(empId).then((empaddr) => {
        if(empaddr){
            empaddr.housename = housename;
            empaddr.street = street;
            empaddr.city = city;
            empaddr.state = state;
            empaddr.pincode = pincode;
            return empaddr.save();
        }
        else{
            return null;
        }
    }).then(() => {
        res.status(200).json({
            message: 'Address edited succesfully'
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            message: 'Address editing failed'
        });
    });
}

exports

exports.deleteEmployee = (req, resp, next) => {
    const id = req.params.id;
    Employee.findByPk(id)
        .then(employee => {
            return employee.destroy();
        })
        .then(() => {
            resp.status(200).json({
                message: 'Employee deleted successfully'
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee deletion failed'
            });
        });
};

exports.allocateRoles = (req, res) => {
    const empId = req.params.id;
    const roleId = req.body.roleId;
    EmpRole.create({
      empId: empId,
      roleId: roleId
    })
    .then((empRole) => {
      res.status(200).json({
        message: 'Role allocated successfullly',
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(404).json({
        message: 'Role allocation failed',
      })
    })
  }
  