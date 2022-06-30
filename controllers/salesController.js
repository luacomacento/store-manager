const productsService = require('../services/productsService');
const salesService = require('../services/salesService');

const salesController = {
  getAll: async (req, res) => {
    const data = await salesService.getAll();
    res.status(200).json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const data = await salesService.getById(id);
    res.status(200).json(data);
  },

  create: async (req, res) => {
    const sale = req.body;
    await Promise.all(
      sale.map(({ productId }) => productsService.getById(productId)),
    );
    const id = await salesService.create(sale);
    res.status(201).json({ id, itemsSold: sale });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await salesService.getById(id);
    await salesService.delete(id);
    res.status(204).end();
  },
};

module.exports = salesController;
