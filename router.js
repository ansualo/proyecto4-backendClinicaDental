const router = require('express').Router();



const roleRoutes = require('./views/roleRoutes');
const authRoutes = require('./views/authRoutes');
const treatmentRoutes = require('./views/treatmentRoutes');
const userRoutes = require('./views/userRoutes');
const appointmentRoutes = require('./views/appointmentRoutes');


router.use('/roles', roleRoutes);
router.use('/auth', authRoutes);
router.use('/treatments', treatmentRoutes);
router.use('/users', userRoutes );
router.use('/appointments', appointmentRoutes);




module.exports = router;