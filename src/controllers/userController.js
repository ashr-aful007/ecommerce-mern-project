const createError = require('http-errors');
const User = require("../models/userModel")




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
     res.status(200).send({
          message: "user profile working",
          users,
     })
   } catch (error){
          next(error)
   }

}


module.exports = { getUsers };