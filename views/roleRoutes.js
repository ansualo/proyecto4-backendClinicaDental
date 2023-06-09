const router = require('express').Router();

const roleController = require('../controllers/roleController');

const auth = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');


router.get('/', auth, isAdmin, roleController.getAllRoles);
router.post('/', auth, isAdmin, roleController.createRole);
router.put('/:id', auth, isAdmin, roleController.updateRole);
router.delete('/:id', auth, isAdmin, roleController.deleteRole);

module.exports = router;