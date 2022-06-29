const NotFoundError = require('../errors/NotFoundError');
const Sales = require('../models/Sales');

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
};

module.exports = salesService;
