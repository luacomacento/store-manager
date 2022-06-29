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
};

module.exports = salesController;
