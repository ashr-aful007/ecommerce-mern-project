const express = require("express");
const morgan = require('morgan')
const app = express();
app.use(morgan('dev'))
const port = process.env.PORT || 5000;


//route for products
app.get("/test", (req, res) =>{
     res.status(200).send({
          message: "api is working fine"
     })
})













app.listen(port, () =>{
     console.log(`server is running on ${port}`);
})