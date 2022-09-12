const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");

let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        console.log("Console");
        console.log(req.body.roles);
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
        }).then(roles => {
            user.setRoles(roles).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
        });
        } else {
            // user role = 1
            user.setRoles([0]).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
            
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
         
        let authorities = [];

        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }

            let token = jwt.sign({ id: user.id, roles: authorities }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};