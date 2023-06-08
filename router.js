const router = require('express').Router();



const roleRoutes = require('./views/roleRoutes');


router.use('/roles', roleRoutes);




module.exports = router;