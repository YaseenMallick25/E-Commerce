const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());

// set port, listen for requests

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);

const db = require("./app/models");

//db.sequelize.sync();
const Role = db.role;
const Product = db.product;

//  db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
//  });

//initial();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Shop." });
});

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