const router = require('express').Router();

const appointmentController = require('../controllers/appointmentController');

const auth = require('../middlewares/verifyToken');


router.post('/', auth, appointmentController.createAppointment);
router.put('/:id', auth, appointmentController.updateAppointment);
router.delete('/:id', auth, appointmentController.deleteAppointment);


module.exports = router;