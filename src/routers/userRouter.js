const express = require("express");
const { getUsers, getUser, deleteUser } = require("../controllers/userController");
const userRouter = express.Router();






//GET: All user profile
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)

module.exports = userRouter;