const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { validateBody } = require('../middlewares/salesMiddleware');

const sales = Router();

sales.get('/', salesController.getAll);
sales.get('/:id', salesController.getById);
sales.post('/', validateBody, salesController.create);

module.exports = sales;