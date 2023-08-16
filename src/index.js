const express = require("express");
const morgan = require('morgan')
const app = express();
const port = process.env.PORT || 5000;

//middleWare,morgan,expressJson,urlencoded
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



//route for products
app.get('/test', (req, res) =>{
     res.status(200).send({
          message: "api is working fine",
     })
})

//user profile
app.get('/api/user',isLoggedIn, (req, res) =>{
     res.status(200).send({
          message: "user profile working"
     })
})









//client error handling
app.use((req, res, next) =>{
     res.status(404).json({message: "route not found"});
     next()
})

//server error handling
app.use((err, res, next) =>{
     console.log(err.stack);
     res.status(500).send("Something broke")
})



app.listen(port, () =>{
     console.log(`server is running on ${port}`);
})