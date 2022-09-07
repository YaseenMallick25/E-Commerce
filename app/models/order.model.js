//order model
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.DOUBLE
        },
        status: {
            type: Sequelize.STRING
        },
        payment: {
            type: Sequelize.STRING
        }
    });
    return Order;
}