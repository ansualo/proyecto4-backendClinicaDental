const router = require('express').Router();

const appointmentController = require('../controllers/appointmentController');

const auth = require('../middlewares/verifyToken');
const isDoctor = require('../middlewares/isDoctor');

router.get('/all', auth, appointmentController.getAllAppointments);
router.get('/patient/:id', auth, appointmentController.getOneAppointment);
router.get('/patient', auth, appointmentController.getPatientAppointments);
router.get('/doctor', auth, isDoctor, appointmentController.getDoctorAppointments);
router.post('/', auth, appointmentController.createAppointment);
router.put('/:id', auth,  appointmentController.updateAppointment);
router.delete('/:id', auth, appointmentController.deleteAppointment);

module.exports = router;