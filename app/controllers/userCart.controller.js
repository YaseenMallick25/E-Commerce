//user Cart Controller
const db = require("../models");
const UserCart = db.usercart;
const Op = db.Sequelize.Op;

const { authJwt } = require("../middleware");
const { product } = require("../models");

// Create and Save a new UserCart
exports.createUserCart = async (req, res) => {
    //verify user
    const userToken = authJwt.getCurrentUser(req);
    console.log(user);

    if (!userToken) {
        res.status(401).send({
            message: "Unauthorized!"
        });
        return;
    }
    // Validate request
    if (!req.body.productid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    //check if product exists in database
    if (!db.product.findByPk(req.body.productid)) {
        res.status(400).send({
            message: "Product does not exist!"
        });
        return;
    }
    // Create a UserCart
    const usercartModel = {
        userid: user.id,
        productid: req.body.productid,
        quantity: req.body.quantity
    };
    // Save UserCart in the database
    const userCart = await UserCart.create(usercartModel)
    try {
        res.send(userCart);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the UserCart."
        });
    }
};

// Retrieve all UserCarts from the database For a User.
exports.findUserCartByUserId = async (req, res) => {
    const userToken = authJwt.getCurrentUser(req);

    if (!userToken) {
        res.status(401).send({
            message: "Unauthorized!"
        });
        return;
    }

    let condition = userToken.id ? { userid: { [Op.eq]: `${userToken.id}` } } : null;

    const userCart = await UserCart.findAll({ 
        where: condition, 
        include: [{
            model: db.product,
            as: "product",
            required: true
        }]
    })
    try {
        res.send(userCart);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving userCart."
        });
    }
};

// Find a single UserCart with an id
exports.findUserCartById = async (req, res ) => {
    const id = req.params.id;

    const userCart = await UserCart.findByPk(id, { 
        include: [{
            model: db.product,
            as: "product",
            required: true
        }]
    })
    try {
        res.send(userCart);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving UserCart with id=" + id
        });
    }
};

// Update a UserCart by the id in the request
exports.updateUserCart = async (req, res) => {
    const id = req.params.id;

    const userCart = await UserCart.update(req.body, {
        where: { id: id }
    })
    try {
        res.send(userCart);
    } catch (err) {
        res.status(500).send({
            message: "Error updating UserCart with id=" + id
        });
    }
};

// Delete a UserCart with the specified id in the request
exports.deleteUserCart = async (req, res) => {
    const id = req.params.id;

    const userCart = await UserCart.destroy({
        where: { id: id }
    })
    try {
        res.send({
            message: "UserCart was deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete UserCart with id=" + id
        });
    }
};

// Delete all UserCarts from the database.
exports.deleteAllUserCarts = async (req, res) => {
    const userCart = await UserCart.destroy({
        where: {},
        truncate: false
    })
    try {
        res.send({
            message: `${userCart} UserCarts were deleted successfully!`
        });
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all userCarts."
        });
    }
};
