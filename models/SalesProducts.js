const db = require('./db');

const SalesProducts = {
  create: async (id, { productId, quantity }) => {
    const sql = `insert into StoreManager.sales_products
    (sale_id, product_id, quantity) values (?, ?, ?)`;
    const [{ affectedRows }] = await db.query(sql, [id, productId, quantity]);
    if (!affectedRows) throw new Error('Failed to create sale_product');
    return !!affectedRows;
  },
};

module.exports = SalesProducts;
