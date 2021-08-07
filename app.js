require('./config/appConfig');

const express = require('express');
const sequelize = require('./util/database');
const { notFound, convertError } = require('./middleware/errorMiddleware')

const Employee = require('./models/employees');
const Department = require('./models/departments');
const Role = require('./models/roles');
const EmpDept = require('./models/employeeDepartment');
const EmpRole = require('./models/employeeRoles');

const empRoutes = require('./routes/employees');
const depRoutes = require('./routes/departments');
const loginRoute = require('./routes/login');
const roleRoute = require('./routes/roles');


/**
* Express instance
* @public
*/
const app = express();

// parse body params and attaches them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/employees', empRoutes);
app.use('/departments', depRoutes);
app.use('/roles', roleRoute);
app.use('/login', loginRoute);

// Error Middlewares
app.use(notFound);
app.use(convertError);

// Employee.hasMany(EmpDept);
EmpDept.belongsTo(Employee, {
    foreignKey: {
        name: 'empId'
    },
    onDelete: 'CASCADE'
});

// Department.hasMany(EmpDept);
EmpDept.belongsTo(Department, {
    foreignKey: {
        name: 'deptId'
    },
    onDelete: 'CASCADE'
});

// Employee.hasMany(EmpRoles)
EmpRole.belongsTo(Employee, {
    foreignKey: {
        name: 'empId',
    },
    onDelete: 'CASCADE'
})

// Role.hasMany(EmpRoles)
EmpRole.belongsTo(Role, {
    foreignKey: {
        name: 'roleId',
    },
    onDelete: 'CASCADE'
})


sequelize
    .sync()
    .then(result => {
        console.log('Listening for requests at http://localhost:7001');
        app.listen(7001);
    })
    .catch(err => {
        console.log(err);
    });
