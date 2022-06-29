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
};

module.exports = Sales;
