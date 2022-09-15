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
            // user role = 1 ie user
            await user.setRoles([1]);
        }

        let authorities = [];
        const roles = await user.getRoles();

        for (const element of roles) {
            authorities.push("ROLE_" + element.name.toUpperCase());
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities
        }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}
    // .then(user => {
    //     console.log("Console");
    //     console.log(req.body.roles);
    //     if (req.body.roles) {
    //         Role.findAll({
    //             where: {
    //                 name: {
    //                     [Op.or]: req.body.roles
    //                 }
    //             }
    //     }).then(roles => {
    //         user.setRoles(roles).then(() => {
    //             res.send({ message: "User was registered successfully!" });
    //         });
    //     });
    //     } else {
    //         // user role = 1
    //         user.setRoles([1]).then(() => {
    //             res.send({ message: "User was registered successfully!" });
    //         });
    //     }
    // })
    // .catch(err => {
    //     res.status(500).send({ message: err.message });
    // });
// }

exports.signin = async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    try {
        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            });
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

        let authorities = [];
        const roles = await user.getRoles();

        for (const element of roles) {
            authorities.push("ROLE_" + element.name.toUpperCase());
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities
        }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}
//     .then(user => {
//         if (!user) {
//             return res.status(404).send({ message: "User Not found." });
//         }

//         let passwordIsValid = bcrypt.compareSync(
//             req.body.password,
//             user.password
//         );
            
//         if (!passwordIsValid) {
//             return res.status(401).send({
//                 accessToken: null,
//                 message: "Invalid Password!"
//             });
//         }
         
//         let authorities = [];

//         user.getRoles().then(roles => {
//             for (let i = 0; i < roles.length; i++) {
//                 authorities.push("ROLE_" + roles[i].name.toUpperCase());
//             }

//             let token = jwt.sign({ id: user.id, roles: authorities }, config.secret, {
//                 expiresIn: 86400 // 24 hours
//             });

//             res.status(200).send({
//                 id: user.id,
//                 username: user.username,
//                 email: user.email,
//                 roles: authorities,
//                 accessToken: token
//             });
//         });
//     })
//     .catch(err => {
//         res.status(500).send({ message: err.message });
//     });
// }