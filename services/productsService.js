const NotFoundError = require('../errors/NotFoundError');
const Products = require('../models/Products');
require('express-async-errors');

const productsService = {
  getAll: async () => {
    const data = await Products.getAll();
    return data;
  },

  getById: async (id) => {
    const data = await Products.getById(id);
    if (!data) throw new NotFoundError('Product not found');
    return data;
  },
};

module.exports = productsService;
