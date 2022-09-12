//user Cart Controller
const db = require("../models");
const UserCart = db.usercart;
const Op = db.Sequelize.Op;

const { authJwt } = require("../middleware");

// Create and Save a new UserCart
exports.createUserCart = (req, res) => {
    //verify user
    const user = authJwt.getCurrentUser(req);
    console.log(user);

    if (!user) {
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
    const usercart = {
        userid: user.id,
        productid: req.body.productid,
        quantity: req.body.quantity
    };
    // Save UserCart in the database
    UserCart.create(usercart)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the UserCart."
            });
        });
};

// // Create and Save a new UserCart
// exports.createUserCart = (req, res) => {
//     // Validate request
//     if (!req.body.userid) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }

//     //check if user and product exists in database
//     //if not, return error
//     //if yes, create usercart
//     if (req.body.userid && req.body.productid) {
//         db.user.findOne({
//             where: {
//                 id: req.body.userid
//             }
//         }).then(user => {
//             if (!user) {
//                 res.status(400).send({
//                     message: "User does not exist!"
//                 });
//                 return;
//             }
//             db.product.findOne({
//                 where: {
//                     id: req.body.productid
//                 }
//             }).then(product => {
//                 if (!product) {
//                     res.status(400).send({
//                         message: "Product does not exist!"
//                     });
//                     return;
//                 }
//                 // Create a UserCart
//                 const usercart = {
//                     userid: req.body.userid,
//                     productid: req.body.productid,
//                     quantity: req.body.quantity
//                 };

//                 // Save UserCart in the database
//                 UserCart.create(usercart)
//                     .then(data => {
//                         res.send(data);
//                     })
//                     .catch(err => {
//                         res.status(500).send({
//                             message:
//                             err.message || "Some error occurred while creating the UserCart."
//                         });
//                     });
//             });
//         });
//     }
// };

// Retrieve all UserCarts from the database For a User.
exports.findUserCartByUserId = (req, res) => {
    const userid = req.params.userid;
    let condition = userid ? { userid: { [Op.eq]: `${userid}` } } : null;

    UserCart.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving usercart."
            });
        });
};

