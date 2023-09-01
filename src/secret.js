require('dotenv').config()


const port = process.env.SERVER_PORT || 5000;
const mongodbUrl = process.env.MONGODB_ATLAS_URL;


const defaultImagePath = process.env.DEFULT_USER_IMAGE_PATH || '../public/images/users/defultImg.png';




module.exports = { port, mongodbUrl, defaultImagePath  }