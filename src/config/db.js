const mongoose = require("mongoose");
const { mongodbUrl } = require("../secret");
const connectDB = async() =>{
     try{
          await mongoose.connect(mongodbUrl)
     } catch (error) {
          
     }
}