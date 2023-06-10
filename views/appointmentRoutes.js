const router = require('express').Router();

const appointmentController = require('../controllers/appointmentController');

const auth = require('../middlewares/verifyToken');


router.post('/', auth, appointmentController.createAppointment);


module.exports = router;