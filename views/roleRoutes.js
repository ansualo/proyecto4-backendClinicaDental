const router = require('express').Router();

const roleController = require('../controllers/roleController');

const auth = require('../middlewares/verifyToken');


router.get('/', auth, roleController.getAllRoles);
router.post('/', auth, roleController.createRole);
router.put('/:id', auth, roleController.updateRole);
router.delete('/:id', auth, roleController.deleteRole);

module.exports = router;