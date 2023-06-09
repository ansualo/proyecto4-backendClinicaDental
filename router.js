const router = require('express').Router();



const roleRoutes = require('./views/roleRoutes');
const authRoutes = require('./views/authRoutes');
const treatmentRoutes = require('./views/treatmentRoutes');


router.use('/roles', roleRoutes);
router.use('/auth', authRoutes);
router.use('/treatments', treatmentRoutes);




module.exports = router;