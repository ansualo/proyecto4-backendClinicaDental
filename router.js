const router = require('express').Router();



const roleRoutes = require('./views/roleRoutes');
const authRoutes = require('./views/authRoutes')


router.use('/roles', roleRoutes);
router.use('/', authRoutes)




module.exports = router;