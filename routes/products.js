const { Router } = require('express');
const productsController = require('../controllers/productsController');
const { validateBody } = require('../middlewares/productsMiddleware');

const products = Router();

products.get('/', productsController.getAll);
products.get('/:id', productsController.getById);
products.post('/', validateBody, productsController.create);

module.exports = products;
