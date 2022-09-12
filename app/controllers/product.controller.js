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

// Get all Products from the database.

exports.getAllProducts = (req, res) => {
    const price = req.query.price;
    
    Product.findAll()
        .then(data => {
            //sort by price ascending or descending
            if (price == 'asc') {
                data.sort((a, b) => a.price - b.price);
            } else if (price == 'desc') {
                data.sort((a, b) => b.price - a.price);
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving products."
            });
        });
}

// get all products by category
exports.getAllProductsByCategory = (req, res) => {
    const category = req.query.category;
    const price = req.query.price;
    let condition = category ? { category: { [Op.like]: `%${category}%` } } : null;

    Product.findAll({ where: condition })
        .then(data => {
            //sort by price ascending or descending
            if (price == 'asc') {
                data.sort((a, b) => a.price - b.price);
            } else if (price == 'desc') {
                data.sort((a, b) => b.price - a.price);
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        });
}

// Get a single Product with an id
exports.getProductById = (req, res) => {
    const id = req.params.id;
    
    Product.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Product with id=" + id
            });
        });
}

// Update a Product by the id in the request
exports.updateProductById = (req, res) => {
    const id = req.params.id;
    
    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
}

// Delete a Product with the specified id in the request
exports.deleteProductById = (req, res) => {
    const id = req.params.id;
    
    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
}

// Delete all Products from the database.
exports.deleteAllProducts = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Products were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all products."
            });
        });
}