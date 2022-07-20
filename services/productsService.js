const ConflictError = require('../errors/ConflictError');
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

  checkIfExists: async (name) => {
    const exists = await Products.checkIfExists(name);
    if (exists) throw new ConflictError('Product already exists');
  },

  create: async (name) => {
    const id = await Products.create(name);
    return id;
  },

  update: async (id, name, quantity) => {
    await Products.update(id, name, quantity);
  },

  delete: async (id) => {
    await Products.delete(id);
  },

  search: async (name) => {
    const data = await Products.search(name);
    return data;
  },
};

module.exports = productsService;
