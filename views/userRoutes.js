const router = require('express').Router();

const userController = require('../controllers/userController');

const auth = require('../middlewares/verifyToken');
const isDoctor = require('../middlewares/isDoctor');
const isAdmin = require('../middlewares/isAdmin');



router.get('/patients', auth, isDoctor, userController.getAllPatients);
router.get('/dentists', auth, isAdmin, userController.getAllDentists);



module.exports = router;