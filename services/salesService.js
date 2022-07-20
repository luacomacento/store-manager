const Joi = require('joi');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnprocessableError = require('../errors/UnprocessableError');
const Sales = require('../models/Sales');
const SalesProducts = require('../models/SalesProducts');
require('express-async-errors');

const salesService = {
  getAll: async () => {
    const data = await Sales.getAll();
    return data;
  },

  getById: async (id) => {
    const data = await Sales.getById(id);
    if (!data.length) throw new NotFoundError('Sale not found');
    return data;
  },

  create: async (sale) => {
    const id = await Sales.create();
    await Promise.all(sale.map((product) => SalesProducts.create(id, product)));
    return id;
  },

  update: async (id, sale) => {
    await Promise.all(sale.map((product) => SalesProducts.update(id, product)));
  },

  delete: async (id) => {
    await Sales.delete(id);
  },

  validateBody: async (body) => {
    const schema = Joi.array().items(
      Joi.object({
        productId: Joi.number().required().integer(),
        quantity: Joi.number().required().integer().min(1),
      }),
    );
  
    const { error, value } = schema.validate(body);
  
    if (error) {
      // error.message = error.details[0].message.replace(/\[.\]\./, '');
      // throw error;
      const {
        details: {
          0: { type, message },
        },
      } = error;
      const returnMessage = message.replace(/\[.\]\./, '');
      if (type.includes('.min')) throw new UnprocessableError(returnMessage);
      throw new BadRequestError(returnMessage);
      // return res.status(400).json({ message: error.details[0].message });
    }

    return value;
  },
};

module.exports = salesService;
