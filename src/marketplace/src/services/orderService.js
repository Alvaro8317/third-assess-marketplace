const OrderRepository = require('../repositories/orderRepository');
const Order = require('../entities/order');

class OrderService {
  async createOrder(orderData) {
    const { customerId, orderDate, status, products } = orderData;
    const order = new Order(null, customerId, orderDate, status, products);
    const orderId = await OrderRepository.createOrder(order);
    return { orderId };
  }
}

module.exports = new OrderService();
