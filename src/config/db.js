const mongoose = require("mongoose");
const { mongodbUrl } = require("../secret");

const connectDataBse = async(options = {}) =>{
     try{
          await mongoose.connect(mongodbUrl, options)
          console.log('connection to DB is successfully');

          mongoose.connection.on('error', (error) =>{
               console.error('DB connection arror', error)
          })
     } catch (error) {
          console.error('could not connect to DB:', error.toString());
     }
}

module.exports = connectDataBse;