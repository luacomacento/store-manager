const db = require('./db');

const Products = {
  getAll: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [rows] = await db.query(sql);
    return rows;
  },

  getById: async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[item]] = await db.query(sql, [id]);
    return item;
  },

  checkIfExists: async (name) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE name = ?';
    const [[item]] = await db.query(sql, [name]);
    return !!item;
  },

  create: async (name) => {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await db.query(sql, [name]);
    return insertId;
  },
};

module.exports = Products;
