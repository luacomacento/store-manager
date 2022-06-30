const db = require('./db');

const Sales = {
  getAll: async () => {
    const sql = `
    select sp.sale_id as saleId, sp.product_id as productId, sp.quantity, s.date
    from StoreManager.sales_products as sp
    inner join StoreManager.sales as s
    on sp.sale_id = s.id
    order by sp.sale_id, sp.product_id;
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  getById: async (id) => {
    const sql = `
    select sp.product_id as productId, sp.quantity, s.date
    from StoreManager.sales_products as sp
    inner join StoreManager.sales as s
    on sp.sale_id = s.id and sp.sale_id = ?
    order by sp.sale_id, sp.product_id;
    `;
    const [rows] = await db.query(sql, [id]);
    return rows;
  },

  create: async () => {
    const sql = 'insert into StoreManager.sales (date) values (now())';
    const [{ insertId }] = await db.query(sql);
    return insertId;
  },

  delete: async (id) => {
    const sql = 'DELETE FROM StoreManager.sales WHERE id = ?';
    await db.query(sql, [id]);
  },
};

module.exports = Sales;
