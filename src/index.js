const app = require('./app');
const connectDataBse = require('./config/db');
const { port } = require('./secret');






app.listen(port, async() =>{
     console.log(`server is running on ${port}`);
     await connectDataBse();
})