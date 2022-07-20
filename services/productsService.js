const Joi = require('joi');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnprocessableError = require('../errors/UnprocessableError');
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

  validateBody: async (body) => {
    const schema = Joi.object({
      name: Joi.string().required().min(5),
    });
  
    const { error, value } = schema.validate(body);
  
    if (error) {
      const {
        details: {
          0: { type, message },
        },
      } = error;
      if (type.includes('.min')) throw new UnprocessableError(message);
      throw new BadRequestError(message);
    }

    return value;
  },
};

module.exports = productsService;
