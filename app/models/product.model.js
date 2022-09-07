//product model
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DOUBLE
        },
        image: {
            type: Sequelize.STRING
        },
        color : {
            type: Sequelize.STRING
        },
        size : {
            type: Sequelize.STRING
        }
    });
    return Product;
}