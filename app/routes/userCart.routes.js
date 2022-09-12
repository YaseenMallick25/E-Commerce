//User Cart route
const { authJwt } = require("../middleware");
const userCart = require("../controllers/userCart.controller.js");

var router = require("express").Router();

// Create a new UserCart
router.post(
    "/createcart", 
    [authJwt.verifyToken],
    userCart.createUserCart
);

// Retrieve UserCarts for a User
router.get(
    "/:userid",
    [authJwt.verifyToken],
    userCart.findUserCartByUserId
);


module.exports = router;