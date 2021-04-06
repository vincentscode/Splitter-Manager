const express = require('express')
const authentication = require('../../middleware/authentication')
const controller = require('./controller')

const router = express.Router()

router.post('/', authentication, controller.create)
router.get('/', authentication, controller.list)
router.get('/:characterId', controller.getById)
router.put('/:characterId', authentication, controller.updateById)
router.delete('/:characterId', authentication, controller.deleteById)

module.exports = router;
