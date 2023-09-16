const createError = require('http-errors');
const User = require("../models/userModel");
const { successResponse } = require('./responseController');
const {findWithId} = require('../useServiceFun/findItemById');
const { deleteImage } = require('../helper/deleteimg');
const { createJSONwebToken } = require('../helper/jsonwebtoken');
const { JwtActivationKey, clientUrl } = require('../secret');
const { emailWithNodeMail } = require('../helper/email');
const jwt = require('jsonwebtoken')
const fs = require('fs').promises;




const getUsers = async(req, res, next) =>{
   try{

    //search functionality for users
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", 'i');
    
    const filter = {
      isAdmin: {$ne: true},
      $or: [
        {name: {$regex: searchRegExp}},
        {email: {$regex: searchRegExp}},
        {phone: {$regex: searchRegExp}},
      ]
    };
    const options = {password: 0}

     const users = await User.find(filter,options).limit(limit).skip((page - 1) * limit);
     const count = await User.find(filter).countDocuments() 
     
     //when we dont get any users
     if(!users) throw createError(404, 'no users found')

     //send response for user searching 
     return successResponse(res, {
        statusCode: 200,
        message: 'users ',
        payload: {
         users,
         pagination:{
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page - 1 : null,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
         }
        }
     })
   } catch (error){
          next(error)
   }

}



//Get user by id route //findWithId is custom fun
//its find item with id
const getUserById = async(req, res, next) =>{
   try{
      const id = req.params.id
      const options = {password: 0}
      const user = await findWithId(User ,id, options);
    
     //send response for user searching 
     return successResponse(res, {
        statusCode: 200,
        message: 'user were returend successfully ',
        payload: {user}     
     })
   } catch (error){
          next(error)
   }

}


//delete user by id 
const deleteUserById = async(req, res, next) =>{
   try{
      const id = req.params.id
      const options = {password: 0}
      const user = await findWithId(User, id, options);

     //delete user img from file with fs module 
     const userImagePath = user.image;
     deleteImage(userImagePath)

     //delete user from DB
     await User.findByIdAndDelete({
        _id: id,
        isAdmin: false
     });
     //send response for user searching 
     return successResponse(res, {
        statusCode: 200,
        message: 'user were deleted successfully ',      
     })
   } catch (error){
          next(error)
   }

}

//regester user 
const processRegister = async(req, res, next) =>{
   try{
      const {name, email, password, phone, address} = req.body;

      //create jwt with helper fun
      const token = createJSONwebToken({name, email, password, phone, address},
         JwtActivationKey,
          '10m');
          
          //prepare email
          const emailData = {
            email,
            subject: 'Account Activation Email',
            html: `
               <h2>Hello ${name} !</h2>
               <p>Plese Click here to <a href="${clientUrl}/api/users/activate/${token}" target="_blank">
                active your account</a></p>
            `
          }

          //send email
          try{
            emailWithNodeMail(emailData)
          }catch(emailError){
             next(createError(500, 'Faild to send verification email'));
             return
          }

          //check user alrady exist or not
          const userExists = await User.exists({email: email});
          if(userExists){
             throw createError(409, 
               'User with this email already exits. Please sign in'
                )
          }


     //send response for user searching 
     return successResponse(res, {
        statusCode: 200,
        message: `Please go to your ${email} for completing your registration process`
        ,  
        payload: {token}    
     })
   } catch (error){
          next(error)
   }

}

//veryfy user 
const activateUserAccout = async(req, res, next) =>{
   try{
     try{
            //get token from frontend 
            const token = req.body.token;
            if(!token) throw createError(404, 'token not found')
      
          const decoded = jwt.verify(token, JwtActivationKey);
            if(!decoded) throw createError(404, 'user was not able to verifyed' );

            //check user alrady exists or not
            const userExists = await User.exists({email: decoded.email});
            if(userExists){
               throw createError(409, 
                 'User with this email already exits. Please sign in'
                  )
            }
      
             await User.create(decoded)
      
      
      
           //send response for user searching 
           return successResponse(res, {
              statusCode: 201,
              message: "User was registered successfully",   
           })
     }catch(error){
            if(error.name === 'TokenExpireError'){
               throw createError(401, 'Token has expired');
            }else if(error.name === 'JsonWebTokenError'){
               throw createError(401, 'Invalid Token')
            }else{
               throw error;
            }
     } 

   } catch (error){
          next(error)
   }

}


module.exports = { getUsers, 
    getUserById,
    processRegister,
    activateUserAccout,
    deleteUserById};