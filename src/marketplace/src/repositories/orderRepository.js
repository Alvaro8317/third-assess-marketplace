const db = require('../infrastructure/database');

class OrderRepository {
  async createOrder(order) {
    await db.initDb();
    const { customerId, orderDate, status, products } = order;
    console.log(order);
    try {
      await db.query('BEGIN');

      const result = await db.query(
          'INSERT INTO ordenes (fecha_orden, total, estado) VALUES ($1, $2, $3) RETURNING id;',
          [orderDate, 1, status]
      );
      console.log(result)
      const orderId = result.rows[0].id;

      for (const product of products) {
        await db.query(
            'INSERT INTO ordenes_productos (orden_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)',
            [orderId, product.productId, product.quantity, product.unitPrice]
        );
      }

      await db.query('COMMIT');
      return orderId;
    } catch (error) {
      await db.query('ROLLBACK');
      console.error(error);
      throw new Error('Error creating order in database');
    } finally {
    }
  }
}

module.exports = new OrderRepository();
