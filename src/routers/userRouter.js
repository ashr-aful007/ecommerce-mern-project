const express = require("express");
const { getUsers } = require("../controllers/userController");
const userRouter = express.Router();






//GET: All user profile
userRouter.get('/', getUsers)

module.exports = userRouter;