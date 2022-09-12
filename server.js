const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const productRoutes = require("./app/routes/product.routes");
const userCartRoutes = require("./app/routes/userCart.routes");

app.use(express.json());

// set port, listen for requests
let corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

const db = require("./app/models");

db.sequelize.sync();

const Role = db.role;
const Product = db.product;
const UserCart = db.usercart;

//  db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
//  });

//initial();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Shop." });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/usercart', userCartRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });
   
//     Role.create({
//       id: 2,
//       name: "moderator"
//     });
   
//     Role.create({
//       id: 3,
//       name: "admin"
//     });
// }

// function initial() {
//   Product.create({
//     name: "T-shirt",
//     description: "T-shirt",
//     category: "T-shirt",
//     price: 10,
//     image: "T-shirt",
//     color: "T-shirt",
//     size: "T-shirt"
//   });
// }

function initial() {
  UserCart.create({
    userid: 1,
    productid: 1,
    quantity: 1
  });
}