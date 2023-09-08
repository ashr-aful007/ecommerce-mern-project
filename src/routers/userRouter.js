const express = require("express");
const { getUsers, getUserById, deleteUserById } = require("../controllers/userController");
const userRouter = express.Router();






//GET: All user profile
userRouter.get('/', getUsers)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUserById)

module.exports = userRouter;