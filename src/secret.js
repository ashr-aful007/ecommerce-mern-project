require('dotenv').config()

const port = process.env.SERVER_PORT || 5000;
const mongodbUrl = process.env.MONGODB_ATLAS_URL;


module.exports = { port, mongodbUrl }