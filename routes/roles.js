const express = require('express');
const validate = require('express-validation');
const roleController = require('../controller/roles')
const router = express.Router()
const {createRoleSchema} = require('../validation/joiRequestValidation');

router.get('/', roleController.getAllRoles)

router.post('/', validate(createRoleSchema), roleController.createRole)

router.put('/:id', roleController.updateRole)

router.delete('/:id', roleController.deleteRole)

module.exports = router;