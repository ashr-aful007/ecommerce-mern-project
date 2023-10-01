const {body} = require("express-validator")

//registration validation
const validateUserRegistration = [
     body("name")
     .trim()
     .notEmpty()
     .withMessage("Name is requred")
     .isLength({min: 3, max: 31})
     .withMessage("name should be at least 3-31 characters long"),
     body("email")
     .trim()
     .notEmpty()
     .withMessage("Email is required")
     .isEmail()
     .withMessage("Invalied email address"),
     body("password")
     .trim()
     .notEmpty()
     .withMessage("Email is required")
     .isLength({ min: 6})
     .withMessage("password should be at least 6 characters long"),
     body("address")
     .trim()
     .notEmpty()
     .withMessage("Email is required")
     .isLength({ min: 3})
     .withMessage("address should be at least 3 characters long"),
     body("phone")
     .trim()
     .notEmpty()
     .withMessage("phone is required"),
     body("image")
     .optional()
     .isString()
     .withMessage("phone is required")


]




//sign in validation


module.exports = {validateUserRegistration};