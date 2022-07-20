const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { validateSalesBody } = require('../middlewares/salesMiddleware');

const router = Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', validateSalesBody, salesController.create);
router.put('/:id', validateSalesBody, salesController.update);
router.delete('/:id', salesController.delete);

module.exports = router;