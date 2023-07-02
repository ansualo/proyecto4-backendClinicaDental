const router = require('express').Router();

const treatmentController = require('../controllers/treatmentController');

const auth = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', treatmentController.getAllTreatments);
router.post('/', auth, isAdmin, treatmentController.createTreatment);
router.put('/:id', auth, isAdmin, treatmentController.updateTreatment);
router.delete('/:id', auth, isAdmin, treatmentController.deleteTreatment);

module.exports = router;