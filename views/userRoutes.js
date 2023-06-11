const router = require('express').Router();

const userController = require('../controllers/userController');

const auth = require('../middlewares/verifyToken');
const isDoctor = require('../middlewares/isDoctor');
const isAdmin = require('../middlewares/isAdmin');



router.get('/patients', auth, isDoctor, userController.getAllPatients);
router.get('/dentists', auth, userController.getAllDentists);

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.delete('/profile/:id', auth, isAdmin, userController.deleteProfile);



module.exports = router;