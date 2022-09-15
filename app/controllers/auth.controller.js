const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");

let bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    // Save User to Database
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    try {
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            });
            await user.setRoles(roles);
        } else {
            // user role = 1
            const userRole = await Role.findOne({ where: { name: "user" } });
            await user.setRoles(userRole);
    }
    
    let authorities = [];
    const roles = await user.getRoles();
    
    for (const element of roles) {
        authorities.push("ROLE_" + element.name.toUpperCase());
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        }
    });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signin = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    try {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        let authorities = [];
        const roles = await user.getRoles();
        
        for (const element of roles) {
            authorities.push("ROLE_" + element.name.toUpperCase());
        }

        res.status(200).send({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};