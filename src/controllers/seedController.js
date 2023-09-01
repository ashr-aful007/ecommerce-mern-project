const User = require('../models/userModel')
const seedUser = async(req, res, next) =>{
     try{
          await User.deleteMany({});
     }catch (error){
          next(error)
     }
}