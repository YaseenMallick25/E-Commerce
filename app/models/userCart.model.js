//user cart model
module.exports = (sequelize, Sequelize) => {
    const UserCart = sequelize.define("userCart", {
      userid: {
        type: Sequelize.INTEGER
      },
      productid: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    });
    return UserCart;
  };