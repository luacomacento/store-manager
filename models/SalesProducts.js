const db = require('./db');

const SalesProducts = {
  create: async (id, { productId, quantity }) => {
    const sql = `insert into StoreManager.sales_products
    (sale_id, product_id, quantity) values (?, ?, ?)`;
    await db.query(sql, [id, productId, quantity]);
  },
};

module.exports = SalesProducts;
