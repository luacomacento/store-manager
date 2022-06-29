const { Router } = require('express');
const productsController = require('../controllers/productsController');

const products = Router();

products.get('/', productsController.getAll);
products.get('/:id', productsController.getById);

module.exports = products;
