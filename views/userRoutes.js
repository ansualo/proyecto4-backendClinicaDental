const router = require('express').Router();

const userController = require('../controllers/userController');

const auth = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.get('/patients', auth, isAdmin, userController.getAllPatients);
router.get('/dentists', userController.getAllDentists);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.delete('/profile/:id', auth, isAdmin, userController.deleteProfile);

module.exports = router;