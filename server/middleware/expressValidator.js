const {body, validationResult} = require("express-validator");

const validateSignup = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({min: 3})
        .withMessage("Username must be at least 3 characters"),
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address"),
    body("password")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters long")
        .matches(/\d/)
        .withMessage("Password must contain a number")
];

const validateLogin = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
];

module.exports = {
    validateSignup, 
    validateLogin
}