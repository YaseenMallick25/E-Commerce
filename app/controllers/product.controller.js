//product controller

const { order } = require("../models");
const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.createProduct = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Product
    const productModel = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image,
        color: req.body.color,
        size: req.body.size
    };
    
    // Save Product in the database
    const product = await Product.create(productModel)
    try {
        res.send(product);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    }
}
        // .then(data => {
        //     res.send(data);
        // })
        // .catch(err => {
        //     res.status(500).send({
        //         message:
        //         err.message || "Some error occurred while creating the Product."
        //     });
        // });
// }

// Get all Products from the database.

exports.getAllProducts = async (req, res) => {
    let price = req.query.price;

    if (!price) {
        price = 'ASC';
    }

    const products = await Product.findAll({
        order: [
            ['price', price],
        ]
    })

    try{
        res.send(products);
        
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    }
}
//         .then(data => {
//             //sort by price ascending or descending
//             if (price == 'asc') {
//                 data.sort((a, b) => a.price - b.price);
//             } else if (price == 'desc') {
//                 data.sort((a, b) => b.price - a.price);
//             }
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                 err.message || "Some error occurred while retrieving products."
//             });
//         });
// }

// get all products by category
exports.getAllProductsByCategory = async (req, res) => {
    const category = req.query.category;
    let price = req.query.price;
    let condition = category ? { category: { [Op.like]: `%${category}%` } } : null;

    if (!price) {
        price = 'ASC';
    }

    const products = await Product.findAll({ 
        where: condition,
        order: [
            ['price', price],
        ]
    })

    try{
        res.send(products);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    }
}

    // const products = await Product.findAll({ where: condition })
    // //sort by price ascending or descending
    //     try{
    //         if (price == 'asc') {
    //             data.sort((a, b) => a.price - b.price);
    //         } else if (price == 'desc') {
    //             data.sort((a, b) => b.price - a.price);
    //         }
    //         res.send(products);
            
    //     } catch (err) {
    //         res.status(500).send({
    //             message:
    //             err.message || "Some error occurred while retrieving products."
    //         });
    //     }
// }

// Get a single Product with an id
exports.getProductById = async (req, res) => {
    const id = req.params.id;
    
    const product = Product.findByPk(id)
    try{
        res.send(product);
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Product with id=" + id
        });
    }
}
        // .then(data => {
        //     res.send(data);
        // })
        // .catch(err => {
        //     res.status(500).send({
        //         message: "Error retrieving Product with id=" + id
        //     });
        // });
// }

// Update a Product by the id in the request
exports.updateProductById = async (req, res) => {
    const id = req.params.id;
    
    const product = await Product.update(req.body, {
        where: { id: id }
    })
    try{
        res.send(product);
    } catch (err) {
        res.status(500).send({
            message: "Error updating Product with id=" + id
        });
    }
}
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Product was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Product with id=" + id
//             });
//         });
// }

// Delete a Product with the specified id in the request
exports.deleteProductById = async (req, res) => {
    const id = req.params.id;
    
    const product = await Product.destroy({
        where: { id: id }
    })
    try{
        res.send(product);
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Product with id=" + id
        });
    }
}
        // .then(num => {
        //     if (num == 1) {
        //         res.send({
        //             message: "Product was deleted successfully!"
        //         });
        //     } else {
        //         res.send({
        //             message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        //         });
        //     }
        // })
        // .catch(err => {
        //     res.status(500).send({
        //         message: "Could not delete Product with id=" + id
        //     });
        // });
// }

// Delete all Products from the database.
exports.deleteAllProducts = async (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
    try{
        res.send({
            message: `${Product} were deleted successfully!`
        });
    }
    catch (err) {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all products."
        });
    }
}
        // .then(nums => {
        //     res.send({ message: `${nums} Products were deleted successfully!` });
        // })
        // .catch(err => {
        //     res.status(500).send({
        //         message:
        //         err.message || "Some error occurred while removing all products."
        //     });
        // });
// }