const createError = require('http-errors');
const User = require("../models/userModel");
const { successResponse } = require('./responseController');
const {createJSONwebToken} = require('../helper/jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtAccessKey } = require('../secret');



const handleLogin = async(req, res, next) =>{
     try{
          //email, password, req.body
          const {email, password} = req.body
          //isExist
          const user = await User.findOne({email});
          if(!user){
               throw createError(
                    404, 'User does not exist with this email. Please register first'
                    );
          }
          //compare the password
          const isPasswordMatch = await bcrypt.compare(password, user.password)
          if(!isPasswordMatch){
               throw createError(
                    404, 
                    'Email and password did not match'
               )
          }
          //isBanned
          if(user.isBanned){
               throw createError(403, 'you are Banned. please contact authority')
          }
          //token, cookie

          //create jwt
          const accessToken = createJSONwebToken(
               {_id: user._id},
               jwtAccessKey,
               '10m'
          );
          res.cookie('accessToken', accessToken, {
               maxAge: 15 * 60 * 1000, // 15 minutes
               httpOnly: true,
               // secure: true,
               sameSite: 'none'
          });
          //send respsonse 
          return successResponse(res, {
               statusCode: 200,
               message: 'users login successfully',
               payload: {},
          })

     } catch (error){
          next(error)
     }

}
const handleLogout = async(req, res, next) =>{
     try{
          //logOut Clear cookie
          res.clearCookie('accessToken')

          //send respsonse 
          return successResponse(res, {
               statusCode: 200,
               message: 'users logout successfully',
               payload: {},
          })

     } catch (error){
          next(error)
     }

}


module.exports = { handleLogin, handleLogout }