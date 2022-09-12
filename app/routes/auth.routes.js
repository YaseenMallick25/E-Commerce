const { verifySignUp } = require("../middleware");
const { Router } = require('express');
const controller = require("../controllers/auth.controller");

const router = Router();

router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

router.post("/signin", controller.signin);

module.exports = router;