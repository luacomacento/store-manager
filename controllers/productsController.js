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

  create: async (req, res) => {
    // const { name } = await productsService.validateBody(req.body);
    const { name } = req.body;
    await productsService.checkIfExists(name);
    const id = await productsService.create(name);
    const item = await productsService.getById(id);
    res.status(201).json(item);
  },

  update: async (req, res) => {
    // const { name, quantity } = await productsService.validateBody(req.body);
    const { name, quantity } = req.body;
    const { id } = req.params;
    await Promise.all([
      productsService.getById(id),
      productsService.update(id, name, quantity),
    ]);
    const item = await productsService.getById(id);
    res.status(200).json(item);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await Promise.all([productsService.getById(id), productsService.delete(id)]);
    res.status(204).end();
  },

  search: async (req, res) => {
    const { q: name } = req.query;
    const data = await productsService.search(name);
    res.status(200).json(data);
  },
};

module.exports = productsController;