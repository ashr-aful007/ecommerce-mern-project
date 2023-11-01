const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require("../secret");

const isLoggedIn = async (req, res, next) =>{
     try{
          const token = req.cookies.accessToken;
          if(!token){
               throw createError(401, 'accessToken not found')
          }
          const decoded = jwt.verify(token, jwtAccessKey);
          if(!decoded){
               throw createError(401, 'Invalid access token please login agin')
          }
          req.user = decoded.user;
          next()
     }catch(error){
          return next(error)
     }
}

const isLogedOut = async (req, res, next) =>{
     try{
          const accessToken = req.cookies.accessToken;
          if(accessToken){
               throw createError(400, 'User is already logged in')
          }
          // if(!accessToken){
          //      throw createError(401, 'Access Token not found please login' );
          // }
          next();
     }catch(error){
          return next(error)
     }
}
module.exports = {isLoggedIn, isLogedOut}