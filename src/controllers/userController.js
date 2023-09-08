const {createError} = require('http-errors');
const User = require("../models/userModel");
const { successResponse } = require('./responseController');
const {findWithId} = require('../useServiceFun/findItemById');
const { deleteImage } = require('../helper/deleteimg');
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


module.exports = { getUsers, getUserById, deleteUserById};