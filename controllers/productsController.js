const productsService = require('../services/productsService');

const productsController = {
  getAll: async (_req, res) => {
    const data = await productsService.getAll();
    res.status(200).json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const data = await productsService.getById(id);
    res.status(200).json(data);
  },
};

module.exports = productsController;