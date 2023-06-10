const router = require('express').Router();

const userController = require('../controllers/userController');

const auth = require('../middlewares/verifyToken');




router.get('/patients', userController.getAllPatients);
router.get('/dentists', userController.getAllDentists);



module.exports = router;