const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const getCurrentUser = (req) => {
    let token = req.headers["x-access-token"];
    let decode;
    if (!token) {
        return null;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return null;
        }
        console.log(decoded);
        decode =  decoded;
    });
    return decode;
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (const element of roles) {
                if (element.name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};



const authJwt = {
  verifyToken: verifyToken,
  getCurrentUser: getCurrentUser,
  isAdmin: isAdmin,
};

module.exports = authJwt;