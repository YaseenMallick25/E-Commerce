//product routes
const { authJwt } = require("../middleware");
const { Router } = require('express');
const productController = require("../controllers/product.controller");

const router = Router();

//create product
router.post(
    "/create", 
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.createProduct
);

//get all products
router.get(
    "/all",
    productController.getAllProducts
);

//get product by category
router.get(
    "/category",
    productController.getAllProductsByCategory
);

//get product by id
router.get(
    "/:id",
    productController.getProductById
);

//update product by id
router.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.updateProductById
);

//delete product by id
router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.deleteProductById
);

//delete all products
router.delete(
    "/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    productController.deleteAllProducts
);

module.exports = router;