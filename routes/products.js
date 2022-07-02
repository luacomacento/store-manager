const { Router } = require('express');
const productsController = require('../controllers/productsController');
const { validateBody } = require('../middlewares/productsMiddleware');

const products = Router();

products.get('/', productsController.getAll);
products.get('/search', productsController.search);
products.get('/:id', productsController.getById);
products.post('/', validateBody, productsController.create);
products.put('/:id', validateBody, productsController.update);
products.delete('/:id', productsController.delete);

module.exports = products;
