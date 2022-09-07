//product controller

const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.createProduct = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Product
    const product = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image,
        color: req.body.color,
        size: req.body.size
    };
    
    // Save Product in the database
    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Product."
            });
        });
};