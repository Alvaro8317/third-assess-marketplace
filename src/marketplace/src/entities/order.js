class Order {
    constructor(id, customerId, orderDate, status, products) {
        this.id = id;
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.status = status;
        this.products = products;
    }
}

module.exports = Order;
