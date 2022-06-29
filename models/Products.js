const db = require('./db');

const database = process.env.MYSQL_DATABASE;

const Products = {
  getAll: async () => {
    const sql = `SELECT * FROM ${database}.products`;
    const [rows] = await db.query(sql);
    return rows;
  },

  getById: async (id) => {
    const sql = `SELECT * FROM ${database}.products WHERE id = ?`;
    const [[item]] = await db.query(sql, [id]);
    return item;
  },
};

module.exports = Products;
