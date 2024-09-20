const OrderService = require('../services/orderService');

class OrderController {
    async createOrder(req, res) {
        try {
            const orderData = req.body;
            const result = await OrderService.createOrder(orderData);
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Error creating order'});
        }
    }
}

module.exports = {OrderController};
