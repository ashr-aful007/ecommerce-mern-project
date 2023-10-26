const express = require("express");
const morgan = require('morgan')
const app = express();
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');
const userRouter = require("./routers/userRouter");
const { seedUser } = require("./controllers/seedController");
const seedRouter = require("./routers/seedRouter");
const createError = require('http-errors');
const cors = require('cors');
const {errorResponse} = require("./controllers/responseController");
const authRouter = require("./routers/authRouter");

require('dotenv').config()

//middleWare opparation
const rateLimiter = rateLimit({
     windowMs: 1 * 60 * 1000, //1 minute
     max: 5,
     message: 'Too many requests from this IP. please try again later'
}) 


//middleWare,morgan,expressJson,urlencoded,xxs-clean,express-rate-limit,
app.use(rateLimiter)
app.use(xssClean())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



//user Login handle middleWare
const isLoggedIn = (req, res, next) =>{
     const login = true;
     if(login){
          next()
     }else{
          return res.status(401).json({message: "plz login first"})
     }
}




//all Routes
app.use('/api/users',userRouter)
app.use('/api/seed', seedRouter)
app.use('/api/auth', authRouter)







//route for products
app.get('/test', rateLimiter, (req, res) =>{
     res.status(200).send({
          message: "api is working fine",
     })
})







//client error handling
app.use((req, res, next) =>{  
     next(createError(404, "route not found"))
     next()
     
})


//server error handling -> handle all the errors
app.use((err, req, res, next) =>{
   return errorResponse(res, {
      statusCode: err.status,
      message: err.message,
   });
   
})

module.exports = app;