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
     .withMessage("password should be at least 6 characters long")
     .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)
     .withMessage('passowrd should be one contain at least one uppercase letter one lowercase letter, one number, and one special character'), 
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
     .custom((value, {req}) =>{
          if(!req.file || !req.file.buffer){
               throw new Error('User image is required')
          }
          return true;
     })
     .withMessage("user imge is requred")


]




//sign in validation


module.exports = {validateUserRegistration};