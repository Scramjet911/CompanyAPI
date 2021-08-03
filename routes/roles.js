const express = require('express')
const roleController = require('../controller/roles')
const router = express.Router()

router.get('/', roleController.getAllRoles)

router.post('/', roleController.createRole)

router.put('/:id', roleController.updateRole)

router.delete('/:id', roleController.deleteRole)

module.exports = router;