const createError = require('http-errors');
const User = require("../models/userModel");
const { successResponse } = require('./responseController');
const {createJSONwebToken} = require('../helper/jsonwebtoken');



const handleLogin = async(req, res, next) =>{
     try{
          //email, password, req.body
          const {email, password} = req.body
          //isExist
          const user = await User.findOne({email})
          //compare the password
          //isBanned
          //token, cookie

     } catch (error){
          next(error)
     }

}


module.exports = { handleLogin }