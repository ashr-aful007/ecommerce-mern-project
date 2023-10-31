const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require("../secret");

const isLoggedIn = async (req, res, next) =>{
     try{
          const token = req.cookies.accessToken
          console.log(token);
     }catch(error){
          return next(error)
     }
}

const isLogedOut = async (req, res, next) =>{

}
module.exports = {isLoggedIn, isLogedOut}