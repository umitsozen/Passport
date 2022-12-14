const formValidation = require("../validation/formValidation")
const bcrypt = require('bcryptjs');
const User = require("../models/User");

module.exports.getUserLogin = (req, res, next) => {
    res.render("pages/login");

};

module.exports.getUserRegister = (req, res, next) => {
    res.render("pages/register");

};

module.exports.postUserLogin = (req, res, next) => {
    res.send("Login Attempted");

};

module.exports.postUserRegister = (req, res, next) => {

    //  console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const errors = [];
    const validationErrors = formValidation.registerValidation(username, password);
    //Server side validation
    if (validationErrors.length > 0)
        return res.render("pages/register", {
            username: username,
            password: password,
            errors: validationErrors
        });


    User.findOne({
        username
    }).then(user => {
        if (user) {
            //user validation
            errors.push({ message: "Username already in usee" });
            return res.render("pages/register", {
                username, password, errors
            });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) throw err;

                const newUser = new User({
                    username: username,
                    password: hash
                });
                newUser.save().then(() => {
                    console.log("Successful");
                    res.redirect("/");
                }).catch(err => console.log(err));


            });
        });



    }).catch(err => console.log(err));




    //  res.send("Register Attemped");


};