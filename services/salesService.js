const NotFoundError = require('../errors/NotFoundError');
const Sales = require('../models/Sales');
const SalesProducts = require('../models/SalesProducts');

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
};

module.exports = salesService;
