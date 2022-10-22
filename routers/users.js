const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res, next) => {
    res.render("pages/index");
    // res.send("Login Page");
});
router.get("/login", userController.getUserLogin);

router.get("/register", userController.getUserRegister);

router.post("/login", userController.postUserLogin);

router.post("/register", userController.postUserRegister );

// router.post("/register", (req, res, next) => {
//     res.send("Register Attemped");
// });
module.exports = router;