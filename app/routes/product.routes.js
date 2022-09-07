//product route

const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
    
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    //create product
    app.post(
        "/api/product/create", 
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.createProduct
    );
    
    // //get all products
    // app.get(
    //     "/api/product/all", 
    //     controller.getAllProducts);
    
    // //get product by id
    // app.get(
    //     "/api/product/:id", 
    //     controller.getProductById);
    
    // //update product by id
    // app.put(
    //     "/api/product/update/:id", 
    //     [authJwt.verifyToken, authJwt.isAdmin], 
    //     controller.updateProduct);
    
    // //delete product by id
    // app.delete(
    //     "/api/product/delete/:id", 
    //     [authJwt.verifyToken, authJwt.isAdmin], 
    //     controller.deleteProduct);
        
};