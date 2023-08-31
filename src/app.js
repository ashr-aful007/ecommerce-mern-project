const express = require("express");
const morgan = require('morgan')
const app = express();
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');
const userRouter = require("./routers/userRouter");
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

app.use('/api/user',userRouter)



//route for products
app.get('/test', rateLimiter, (req, res) =>{
     res.status(200).send({
          message: "api is working fine",
     })
})











//client error handling
app.use((req, res, next) =>{  
     next(createError(404, "route not found"))
})


//server error handling -> handle all the errors
app.use((err, res, next) =>{
   return res.status(err.status || 500).json({
     success : false,
     message : err.message,
   })
})

module.exports = app;