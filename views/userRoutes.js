const router = require('express').Router();

const userController = require('../controllers/userController');

const auth = require('../middlewares/verifyToken');




router.get('/patients', userController.getAllPatients);



module.exports = router;