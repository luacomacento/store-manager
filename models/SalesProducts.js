const db = require('./db');

const SalesProducts = {
  create: async (id, { productId, quantity }) => {
    const sql = `insert into StoreManager.sales_products
    (sale_id, product_id, quantity) values (?, ?, ?)`;
    const [{ insertId }] = await db.query(sql, [id, productId, quantity]);
    if (!insertId) throw new Error('Failed to create sale_product');
    return insertId;
  },
};

module.exports = SalesProducts;
