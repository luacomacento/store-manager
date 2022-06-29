const { Router } = require('express');
const salesController = require('../controllers/salesController');
// const { validateBody } = require('../middlewares/salesMiddleware');

const sales = Router();

sales.get('/', salesController.getAll);
sales.get('/:id', salesController.getById);

module.exports = sales;