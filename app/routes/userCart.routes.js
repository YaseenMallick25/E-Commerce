//User Cart route
const { authJwt } = require("../middleware");
const userCart = require("../controllers/userCart.controller.js");

var router = require("express").Router();

// Create a new UserCart
router.post(
    "/", 
    [authJwt.verifyToken],
    userCart.createUserCart
);

// Retrieve UserCarts for a User
router.get(
    "/",
    [authJwt.verifyToken],
    userCart.findUserCartByUserId
);

// Retrieve a single UserCart with id
router.get(
    "/:id",
    [authJwt.verifyToken],
    userCart.findUserCartById
);

// Update a UserCart with id
router.put(
    "/:id",
    [authJwt.verifyToken],
    userCart.updateUserCart
);

// Delete a UserCart with id
router.delete(
    "/:id",
    [authJwt.verifyToken],
    userCart.deleteUserCart
);

// Delete all UserCarts
router.delete(
    "/",
    [authJwt.verifyToken],
    userCart.deleteAllUserCarts
);


module.exports = router;